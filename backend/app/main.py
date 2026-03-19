from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import analyze

app = FastAPI(
    title="AI GitHub Repo Explainer",
    description="Paste a GitHub URL and get a human-friendly explanation",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analyze.router, prefix="/api", tags=["analyze"])

@app.get("/")
def root():
    return {"status": "ok", "message": "AI GitHub Explainer API is running"}
