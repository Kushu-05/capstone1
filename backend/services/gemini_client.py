"""
Gemini Client Wrapper - delegates to universal LLMService
Maintains 100% backward compatibility with existing agent imports
while providing multi-provider and model fallback capabilities.
"""
from typing import Any
from backend.services.llm_service import llm_service

class GeminiClient:
    """Wrapper around LLMService maintaining backward compatibility."""
    
    @property
    def is_configured(self) -> bool:
        return llm_service.gemini_configured or llm_service.openai_configured

    @property
    def model_name(self) -> str:
        track = llm_service.get_last_execution_metadata()
        return track.get("model", "")

    def generate_json_or_text(
        self,
        prompt: str,
        system_instruction: str = "",
        as_json: bool = True
    ) -> Any:
        return llm_service.generate_json_or_text(
            prompt=prompt,
            system_instruction=system_instruction,
            as_json=as_json
        )

# Global singleton
gemini_client = GeminiClient()
