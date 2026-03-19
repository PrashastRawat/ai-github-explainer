from pydantic import BaseModel, HttpUrl
from typing import Optional

class AnalyzeRequest(BaseModel):
    repo_url: str

class RepoExplanation(BaseModel):
    what_it_does: str
    technologies: str
    folder_structure: str
    architecture: str
    how_to_run: str
    key_features: str

class AnalyzeResponse(BaseModel):
    repo_name: str
    repo_url: str
    description: Optional[str] = None
    explanation: RepoExplanation
    stars: Optional[int] = None
    language: Optional[str] = None