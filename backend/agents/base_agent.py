import uuid
from abc import ABC, abstractmethod
from typing import Any, Dict
from datetime import datetime
from backend.schemas.agent_schemas import A2AMessageEnvelope
from backend.utils.logger import logger

class BaseAgent(ABC):
    """
    Abstract base class for all specialized agents in the document intelligence system.
    Supports structured Agent-to-Agent (A2A) message passing.
    """

    def __init__(self, agent_id: str, name: str, role: str):
        self.agent_id = agent_id
        self.name = name
        self.role = role

    def create_a2a_message(
        self,
        recipient: str,
        workflow_run_id: str,
        document_id: str,
        payload_type: str
    ) -> A2AMessageEnvelope:
        """Create a standardized A2A message envelope."""
        return A2AMessageEnvelope(
            message_id=str(uuid.uuid4()),
            sender=self.name,
            recipient=recipient,
            timestamp=datetime.utcnow(),
            workflow_run_id=workflow_run_id,
            document_id=document_id,
            payload_type=payload_type
        )

    @abstractmethod
    def run(self, input_data: Any, context: Dict[str, Any]) -> Any:
        """Execute the agent's core task and return structured output."""
        pass
