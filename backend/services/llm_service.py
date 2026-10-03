"""
Universal Multi-Provider LLM Service with Dual-Tier Fallback & JSON Repair
- Primary Provider: OpenAI (with primary & fallback model retry)
- Fallback Provider: Google Gemini (with primary & fallback model retry)
- Structured JSON Repair & Retry Strategy
- Complete Metadata Tracking for API Responses
"""
import json
import re
import time
import threading
from typing import Dict, Any, Optional, List, Tuple
from backend.config import settings
from backend.utils.logger import logger
from backend.utils.errors import (
    RecoverableError,
    LLMTimeoutError,
    LLMRateLimitError,
    LLMServiceUnavailableError,
    MalformedJSONError,
    sanitize_log_message
)

# Optional Imports
try:
    from openai import OpenAI, APIError, RateLimitError, APIConnectionError, Timeout
    OPENAI_AVAILABLE = True
except ImportError:
    OPENAI_AVAILABLE = False

try:
    import google.generativeai as genai
    GEMINI_AVAILABLE = True
except ImportError:
    GEMINI_AVAILABLE = False


def safe_parse_json(text: str) -> Tuple[Optional[Any], bool]:
    """
    Attempts:
    Step 1: Normal JSON parsing
    Step 2: Safe regex extraction of outermost {...} or [...] and trailing comma removal
    Returns: (parsed_data, was_repaired_bool)
    """
    if not text or not isinstance(text, str):
        return None, False

    # Step 1: Normal parsing
    try:
        return json.loads(text.strip()), False
    except (json.JSONDecodeError, TypeError):
        pass

    # Step 2: Safe extraction & repair
    cleaned = text.strip()
    # Strip markdown code blocks ```json ... ```
    cleaned = re.sub(r"^```(?:json)?\s*", "", cleaned, flags=re.MULTILINE)
    cleaned = re.sub(r"^```\s*$", "", cleaned, flags=re.MULTILINE).strip()

    try:
        return json.loads(cleaned), True
    except (json.JSONDecodeError, TypeError):
        pass

    # Match outermost JSON object or array
    match = re.search(r"(\{[\s\S]*\}|\[[\s\S]*\])", cleaned)
    if match:
        candidate = match.group(0)
        # Remove trailing commas before } or ]
        repaired = re.sub(r",\s*([}\]])", r"\1", candidate)
        try:
            return json.loads(repaired), True
        except (json.JSONDecodeError, TypeError):
            pass

    return None, False


class LLMService:
    """
    Enterprise-grade LLM orchestrator implementing:
    1. Provider Fallback (OpenAI -> Gemini -> Heuristic)
    2. Model Fallback (Primary Model -> Fallback Model)
    3. Structured JSON Parsing & Repair Fallback
    4. Controlled Retry Limits without infinite loops
    """

    def __init__(self):
        self._local = threading.local()
        self._model_cooldowns: Dict[str, float] = {}

        # Initialize OpenAI Client
        self.openai_client = None
        self.openai_configured = False
        oai_key = settings.OPENAI_API_KEY.strip()
        if OPENAI_AVAILABLE and oai_key and oai_key != "your_openai_api_key_here":
            try:
                self.openai_client = OpenAI(api_key=oai_key, timeout=settings.LLM_TIMEOUT)
                self.openai_configured = True
                logger.info(f"OpenAI client initialized. Primary model: {settings.OPENAI_MODEL}, Fallback model: {settings.OPENAI_FALLBACK_MODEL}")
            except Exception as e:
                logger.warning(f"Failed to initialize OpenAI client: {sanitize_log_message(str(e))}")

        # Initialize Gemini Client
        self.gemini_configured = False
        gem_key = settings.GEMINI_API_KEY.strip()
        if GEMINI_AVAILABLE and gem_key and gem_key != "your_gemini_api_key_here":
            try:
                genai.configure(api_key=gem_key)
                self.gemini_configured = True
                logger.info(f"Gemini client initialized. Primary model: {settings.GEMINI_MODEL}, Fallback model: {settings.GEMINI_FALLBACK_MODEL}")
            except Exception as e:
                logger.warning(f"Failed to initialize Gemini client: {sanitize_log_message(str(e))}")

    def _get_tracking(self) -> Dict[str, Any]:
        if not hasattr(self._local, "tracking"):
            self._local.tracking = {
                "fallbacks_used": [],
                "llm_provider": "none",
                "model": "",
                "is_fallback_active": False
            }
        return self._local.tracking

    def reset_tracking(self):
        """Resets tracking for a new pipeline execution."""
        self._local.tracking = {
            "fallbacks_used": [],
            "llm_provider": "none",
            "model": "",
            "is_fallback_active": False
        }

    def get_last_execution_metadata(self) -> Dict[str, Any]:
        """Returns metadata regarding providers, models, and fallbacks used in recent calls."""
        return dict(self._get_tracking())

    # --------------------------------------------------------------------------
    # OpenAI Provider Execution with Model Fallback
    # --------------------------------------------------------------------------
    def _call_openai(
        self,
        prompt: str,
        system_instruction: str,
        model_name: str,
        as_json: bool
    ) -> str:
        if not self.openai_configured or not self.openai_client:
            raise RecoverableError("OpenAI client is not configured or API key is missing.")

        messages = []
        if system_instruction:
            messages.append({"role": "system", "content": system_instruction})
        messages.append({"role": "user", "content": prompt})

        kwargs: Dict[str, Any] = {
            "model": model_name,
            "messages": messages,
            "temperature": 0.1,
            "timeout": settings.LLM_TIMEOUT
        }
        if as_json and any(m in model_name.lower() for m in ["gpt-4o", "gpt-4-turbo", "gpt-3.5-turbo"]):
            kwargs["response_format"] = {"type": "json_object"}

        response = self.openai_client.chat.completions.create(**kwargs)
        return response.choices[0].message.content or ""

    def _execute_openai_with_model_fallback(
        self,
        prompt: str,
        system_instruction: str,
        as_json: bool
    ) -> Tuple[str, str, List[str]]:
        fallbacks: List[str] = []
        primary_model = settings.OPENAI_MODEL
        fallback_model = settings.OPENAI_FALLBACK_MODEL

        # 1. Try Primary Model
        try:
            raw = self._call_openai(prompt, system_instruction, primary_model, as_json)
            return raw, primary_model, fallbacks
        except Exception as e:
            err_msg = str(e).lower()
            logger.warning(f"OpenAI Primary Model '{primary_model}' failed: {sanitize_log_message(str(e))}")

            # Determine if recoverable
            is_recoverable = any(k in err_msg for k in ["rate limit", "429", "timeout", "timed out", "500", "502", "503", "connection"])
            if not is_recoverable and fallback_model == primary_model:
                raise e

            # 2. Try Fallback Model if configured and different
            if fallback_model and fallback_model != primary_model:
                logger.info(f"Retrying OpenAI with fallback model: '{fallback_model}'")
                try:
                    raw = self._call_openai(prompt, system_instruction, fallback_model, as_json)
                    fallbacks.append("llm_model")
                    return raw, fallback_model, fallbacks
                except Exception as fe:
                    logger.error(f"OpenAI Fallback Model '{fallback_model}' also failed: {sanitize_log_message(str(fe))}")
                    raise fe
            raise e

    # --------------------------------------------------------------------------
    # Gemini Provider Execution with Model Fallback & Fast-Fail Circuit Breaker
    # --------------------------------------------------------------------------
    def _call_gemini(
        self,
        prompt: str,
        system_instruction: str,
        model_name: str
    ) -> str:
        if not self.gemini_configured or not GEMINI_AVAILABLE:
            raise RecoverableError("Gemini client is not configured or API key is missing.")

        # Circuit breaker: Check if model is in active cooldown
        cooldown_until = self._model_cooldowns.get(model_name, 0)
        if time.time() < cooldown_until:
            remaining = int(cooldown_until - time.time())
            raise RecoverableError(f"Model '{model_name}' is in quota cooldown for {remaining}s. Fast-failing.")

        try:
            model = genai.GenerativeModel(
                model_name=model_name,
                system_instruction=system_instruction if system_instruction else None,
                generation_config={"temperature": 0.1, "top_p": 0.9, "max_output_tokens": 2048}
            )
            # CRITICAL: retry=None prevents Google gRPC client from sleeping 30-50s on 429!
            response = model.generate_content(
                prompt,
                request_options={"timeout": settings.LLM_TIMEOUT, "retry": None}
            )
            return response.text.strip() if response and hasattr(response, "text") else ""
        except Exception as e:
            err_str = str(e).lower()
            if any(k in err_str for k in ["429", "quota", "resource_exhausted", "resourceexhausted"]):
                # Parse adaptive retry seconds from error message if available
                retry_s = None
                match = re.search(r"retry\s+in\s+([0-9.]+)\s*s", err_str)
                if match:
                    try:
                        retry_s = float(match.group(1))
                    except Exception:
                        pass
                if retry_s is None:
                    match_sec = re.search(r"seconds:\s*([0-9.]+)", err_str)
                    if match_sec:
                        try:
                            retry_s = float(match_sec.group(1))
                        except Exception:
                            pass
                cooldown = min(max((retry_s + 0.5) if retry_s is not None else 15.0, 5.0), 30.0)
                self._model_cooldowns[model_name] = time.time() + cooldown
                logger.warning(f"Gemini model '{model_name}' quota exhausted (429). Placed on {int(cooldown)}s adaptive cooldown (retry delay was {retry_s}s).")
            elif any(k in err_str for k in ["503", "high demand", "unavailable"]):
                self._model_cooldowns[model_name] = time.time() + 8  # 8s transient cooldown
                logger.warning(f"Gemini model '{model_name}' high demand (503). Placed on 8s transient cooldown.")
            elif any(k in err_str for k in ["404", "not found"]):
                self._model_cooldowns[model_name] = time.time() + 600  # 10 min cooldown for invalid model
                logger.warning(f"Gemini model '{model_name}' not found (404). Placed on cooldown.")
            raise e

    def _execute_gemini_with_model_fallback(
        self,
        prompt: str,
        system_instruction: str
    ) -> Tuple[str, str, List[str]]:
        fallbacks: List[str] = []
        primary_model = settings.GEMINI_MODEL
        fallback_model = settings.GEMINI_FALLBACK_MODEL

        # 1. Try Primary Model if not in cooldown
        primary_in_cooldown = time.time() < self._model_cooldowns.get(primary_model, 0)
        if not primary_in_cooldown:
            try:
                raw = self._call_gemini(prompt, system_instruction, primary_model)
                return raw, primary_model, fallbacks
            except Exception as e:
                logger.warning(f"Gemini Primary Model '{primary_model}' failed: {sanitize_log_message(str(e))}")
        else:
            logger.info(f"Gemini Primary Model '{primary_model}' is currently in cooldown; bypassing directly to fallback model.")

        # 2. Try Fallback Model if configured and different
        if fallback_model and fallback_model != primary_model:
            fallback_in_cooldown = time.time() < self._model_cooldowns.get(fallback_model, 0)
            if not fallback_in_cooldown:
                logger.info(f"Engaging Gemini with fallback model: '{fallback_model}'")
                try:
                    raw = self._call_gemini(prompt, system_instruction, fallback_model)
                    fallbacks.append("llm_model")
                    return raw, fallback_model, fallbacks
                except Exception as fe:
                    logger.error(f"Gemini Fallback Model '{fallback_model}' also failed: {sanitize_log_message(str(fe))}")
                    raise fe
            else:
                logger.warning(f"Gemini Fallback Model '{fallback_model}' is also in cooldown.")

        raise RecoverableError(f"All Gemini models ({primary_model}, {fallback_model}) unavailable or quota exhausted.")

    # --------------------------------------------------------------------------
    # Ollama Provider Execution (Local Fallback LLM)
    # --------------------------------------------------------------------------
    def _call_ollama(
        self,
        prompt: str,
        system_instruction: str,
        as_json: bool
    ) -> str:
        """
        Executes a prompt against local Ollama instance (REST API /api/chat).
        Provides a 100% local, low-resource LLM fallback (e.g. qwen2.5:3b).
        """
        import httpx

        # Check if Ollama was recently verified to be offline (cached for 60s)
        offline_until = getattr(self, "_ollama_offline_until", 0)
        if time.time() < offline_until:
            raise RecoverableError(f"Ollama local service is offline (cached for {int(offline_until - time.time())}s).")

        base_url = settings.OLLAMA_BASE_URL.rstrip("/")
        endpoint = f"{base_url}/api/chat"
        messages = []
        if system_instruction:
            messages.append({"role": "system", "content": system_instruction})
        messages.append({"role": "user", "content": prompt})

        payload = {
            "model": settings.OLLAMA_MODEL,
            "messages": messages,
            "stream": False,
            "options": {"temperature": 0.1}
        }
        if as_json:
            payload["format"] = "json"

        try:
            with httpx.Client(timeout=httpx.Timeout(settings.OLLAMA_TIMEOUT, connect=2.0)) as client:
                resp = client.post(endpoint, json=payload)
                resp.raise_for_status()
                data = resp.json()
                msg = data.get("message", {})
                return msg.get("content", "").strip()
        except Exception as e:
            self._ollama_offline_until = time.time() + 60
            logger.warning(f"Ollama request to {endpoint} failed: {e}. Marked offline for 60s.")
            raise RecoverableError(f"Ollama local model '{settings.OLLAMA_MODEL}' unavailable: {e}")

    # --------------------------------------------------------------------------
    # Main Universal Invocation with Provider Fallback & JSON Repair
    # --------------------------------------------------------------------------
    def generate_json_or_text(
        self,
        prompt: str,
        system_instruction: str = "",
        as_json: bool = True
    ) -> Any:
        """
        Executes an LLM request following the strict robustness protocol:
        1. Try Primary Provider (default: Gemini) with model retry
        2. On failure, try Fallback Provider (Ollama local model)
        3. If JSON requested: Normal Parse -> Regex Repair -> Prompt Retry -> Structured Error Fallback
        4. If all providers fail: return None to allow deterministic heuristic agent fallback
        """
        tracking = self._get_tracking()
        primary_provider = settings.LLM_PROVIDER.lower().strip()
        fallback_provider = settings.FALLBACK_LLM_PROVIDER.lower().strip()

        raw_text = None
        active_provider = "none"
        active_model = ""

        # Step 1: Attempt Primary Provider
        if primary_provider == "gemini" and self.gemini_configured:
            try:
                raw_text, active_model, model_fallbacks = self._execute_gemini_with_model_fallback(
                    prompt, system_instruction
                )
                active_provider = "gemini"
                for fb in model_fallbacks:
                    if fb not in tracking["fallbacks_used"]:
                        tracking["fallbacks_used"].append(fb)
            except Exception as e:
                logger.warning(f"Primary provider 'gemini' failed: {sanitize_log_message(str(e))}. Attempting fallback provider.")

        elif primary_provider == "openai" and self.openai_configured:
            try:
                raw_text, active_model, model_fallbacks = self._execute_openai_with_model_fallback(
                    prompt, system_instruction, as_json
                )
                active_provider = "openai"
                for fb in model_fallbacks:
                    if fb not in tracking["fallbacks_used"]:
                        tracking["fallbacks_used"].append(fb)
            except Exception as e:
                logger.warning(f"Primary provider 'openai' failed: {sanitize_log_message(str(e))}. Attempting fallback provider.")

        elif primary_provider == "ollama":
            try:
                raw_text = self._call_ollama(prompt, system_instruction, as_json)
                active_provider = "ollama"
                active_model = settings.OLLAMA_MODEL
            except Exception as e:
                logger.warning(f"Primary provider 'ollama' failed: {sanitize_log_message(str(e))}. Attempting fallback provider.")

        # Step 2: Attempt Fallback Provider if Primary failed or wasn't configured
        if raw_text is None and fallback_provider != "none":
            if fallback_provider == "ollama":
                try:
                    logger.info(f"Engaging Fallback Local LLM Provider: 'ollama' (model: {settings.OLLAMA_MODEL})")
                    raw_text = self._call_ollama(prompt, system_instruction, as_json)
                    active_provider = "ollama"
                    active_model = settings.OLLAMA_MODEL
                    if "ollama_fallback" not in tracking["fallbacks_used"]:
                        tracking["fallbacks_used"].append("ollama_fallback")
                    if "llm_provider" not in tracking["fallbacks_used"]:
                        tracking["fallbacks_used"].append("llm_provider")
                except Exception as ole:
                    logger.warning(f"Fallback LLM provider 'ollama' unavailable or failed: {sanitize_log_message(str(ole))}. Bypassing to heuristic fallback.")

            elif fallback_provider == "gemini" and self.gemini_configured:
                try:
                    logger.info("Engaging Fallback LLM Provider: 'gemini'")
                    raw_text, active_model, model_fallbacks = self._execute_gemini_with_model_fallback(
                        prompt, system_instruction
                    )
                    active_provider = "gemini"
                    if "llm_provider" not in tracking["fallbacks_used"]:
                        tracking["fallbacks_used"].append("llm_provider")
                    for fb in model_fallbacks:
                        if fb not in tracking["fallbacks_used"]:
                            tracking["fallbacks_used"].append(fb)
                except Exception as ge:
                    logger.error(f"Fallback LLM provider 'gemini' also failed: {sanitize_log_message(str(ge))}")

            elif fallback_provider == "openai" and self.openai_configured:
                try:
                    logger.info("Engaging Fallback LLM Provider: 'openai'")
                    raw_text, active_model, model_fallbacks = self._execute_openai_with_model_fallback(
                        prompt, system_instruction, as_json
                    )
                    active_provider = "openai"
                    if "llm_provider" not in tracking["fallbacks_used"]:
                        tracking["fallbacks_used"].append("llm_provider")
                    for fb in model_fallbacks:
                        if fb not in tracking["fallbacks_used"]:
                            tracking["fallbacks_used"].append(fb)
                except Exception as oe:
                    logger.error(f"Fallback LLM provider 'openai' also failed: {sanitize_log_message(str(oe))}")
            else:
                logger.warning(f"Fallback provider '{fallback_provider}' is not configured or missing credentials.")

        # If all providers failed or none configured
        if raw_text is None:
            tracking["llm_provider"] = "none"
            tracking["model"] = "none"
            logger.info("No active LLM response available. Handing off to deterministic agent fallbacks.")
            return None

        # Record active metadata
        tracking["llm_provider"] = active_provider
        tracking["model"] = active_model

        if not as_json:
            return raw_text

        # ======================================================================
        # Step 3: Structured JSON Fallback Strategy
        # ======================================================================
        parsed_data, was_repaired = safe_parse_json(raw_text)
        if parsed_data is not None:
            if was_repaired and "json_repair" not in tracking["fallbacks_used"]:
                tracking["fallbacks_used"].append("json_repair")
            return parsed_data

        # Attempt Step 3.3: One targeted retry with explicit valid JSON instruction
        logger.warning("Initial response was malformed JSON. Executing Step 3.3: Targeted JSON retry prompt.")
        retry_prompt = (
            f"Your previous response was malformed and could not be parsed as valid JSON.\n"
            f"You MUST output strictly valid JSON conforming to the original schema. "
            f"Do NOT include markdown formatting, backticks, or explanatory text.\n\n"
            f"Original Request:\n{prompt}"
        )
        try:
            if active_provider == "openai":
                retry_raw = self._call_openai(retry_prompt, "You are a strict JSON formatter.", active_model, as_json=True)
            elif active_provider == "ollama":
                retry_raw = self._call_ollama(retry_prompt, "You are a strict JSON formatter.", as_json=True)
            else:
                retry_raw = self._call_gemini(retry_prompt, "You are a strict JSON formatter.", active_model)

            retry_parsed, _ = safe_parse_json(retry_raw)
            if retry_parsed is not None:
                if "json_retry" not in tracking["fallbacks_used"]:
                    tracking["fallbacks_used"].append("json_retry")
                return retry_parsed
        except Exception as retry_err:
            logger.error(f"JSON retry prompt also failed: {sanitize_log_message(str(retry_err))}")

        # Step 3.4: Return clean structured error rather than crashing
        logger.error("JSON parsing completely failed after normal parse, repair, and retry.")
        if "json_failed" not in tracking["fallbacks_used"]:
            tracking["fallbacks_used"].append("json_failed")

        return {
            "error": "MalformedJSONError",
            "message": "Model returned invalid JSON that could not be parsed after repair and retry.",
            "raw_output": raw_text[:500]
        }

# Global singleton
llm_service = LLMService()
