from fastapi import APIRouter, HTTPException
from app.services.github_service import collect_repo_data
from app.services.ai_service import analyze_with_ai

router = APIRouter()

@router.post("/analyze")
async def analyze_repo(request: dict):
    try:
        print(f"Analyzing repo: {request.get('repo_url')}")

        # Step 1: Fetch from GitHub
        repo_data = await collect_repo_data(request["repo_url"])
        print(f"GitHub data fetched for: {repo_data['full_name']}")

        # Step 2: Analyze with AI
        explanation = await analyze_with_ai(repo_data)
        print(f"AI analysis complete")

        # Step 3: Return combined response
        return {
            "repo_name": repo_data["full_name"],
            "repo_url": request["repo_url"],
            "description": repo_data["description"],
            "stars": repo_data["stars"],
            "language": repo_data["language"],
            "explanation": explanation
        }

    except ValueError as e:
        print(f"ValueError: {e}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        print(f"Unexpected error: {type(e).__name__}: {e}")
        raise HTTPException(status_code=500, detail=str(e))
