from pydantic import BaseModel
from typing import Optional

class InsightSchema(BaseModel):
    end_year: Optional[int] = None
    intensity: Optional[int] = None
    sector: Optional[str] = None
    topic: Optional[str] = None
    insight: Optional[str] = None
    url: Optional[str] = None
    region: Optional[str] = None
    start_year: Optional[int] = None
    impact: Optional[int] = None
    added: Optional[str] = None
    published: Optional[str] = None
    country: Optional[str] = None
    relevance: Optional[int] = None
    pestle: Optional[str] = None
    source: Optional[str] = None
    title: Optional[str] = None
    likelihood: Optional[int] = None