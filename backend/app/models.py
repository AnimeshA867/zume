from typing import Optional, List
from pydantic import BaseModel


class MsgPayload(BaseModel):
    msg_id: Optional[int]
    msg_name: str


class ResumeInfo(BaseModel):
    name: Optional[str]
    contact_info: Optional[str]
    work_experience: List[str]
    education: List[str]


class JobDescriptionAnalysis(BaseModel):
    skills: List[str]
