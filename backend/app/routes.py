from fastapi import APIRouter, HTTPException
from app.schemas import InsightSchema
from app.utils import load_json_data

router = APIRouter()

@router.get("/data", response_model=list[InsightSchema])
async def get_data():
    try:
        raw_data = load_json_data("c:/Users/Victus/Desktop/data-viz-dashboard/backend/jsondata.json")
        # Clean data: convert empty strings to None for integer fields
        cleaned_data = []
        int_fields = ["end_year", "start_year", "impact", "intensity", "relevance", "likelihood"]
        for item in raw_data:
            for field in int_fields:
                if field in item and (item[field] == "" or item[field] is None):
                    item[field] = None
            cleaned_data.append(item)
        return cleaned_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))