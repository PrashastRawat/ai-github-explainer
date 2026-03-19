from fastapi import APIRouter, HTTPException
from app.services.github_service import collect_repo_data

router = APIRouter()

@router.post("/analyze")
async def analyze_repo(request: dict):
    try:
        repo_data = await collect_repo_data(request["repo_url"])
        return repo_data
    except ValueError as e:
        print(f"ValueError: {e}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        print(f"Unexpected error: {type(e).__name__}: {e}")
        raise HTTPException(status_code=500, detail=str(e))