import httpx
import base64
from app.config import settings

GITHUB_API_BASE = "https://api.github.com"

HEADERS = {
    "Authorization": f"Bearer {settings.GITHUB_TOKEN}",
    "Accept": "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28"
}


def parse_github_url(url: str) -> tuple[str, str]:
    """
    Extracts owner and repo name from a GitHub URL.
    Handles formats like:
      - https://github.com/owner/repo
      - https://github.com/owner/repo/
      - https://github.com/owner/repo/tree/main
    """
    url = url.strip().rstrip("/")
    parts = url.replace("https://github.com/", "").split("/")

    if len(parts) < 2:
        raise ValueError("Invalid GitHub URL. Expected format: https://github.com/owner/repo")

    owner = parts[0]
    repo = parts[1]
    return owner, repo


async def fetch_repo_metadata(client: httpx.AsyncClient, owner: str, repo: str) -> dict:
    """Fetches basic repo info: description, stars, language, etc."""
    response = await client.get(
        f"{GITHUB_API_BASE}/repos/{owner}/{repo}",
        headers=HEADERS
    )
    response.raise_for_status()
    return response.json()


async def fetch_readme(client: httpx.AsyncClient, owner: str, repo: str) -> str:
    """Fetches and decodes the README file content."""
    try:
        response = await client.get(
            f"{GITHUB_API_BASE}/repos/{owner}/{repo}/readme",
            headers=HEADERS
        )
        response.raise_for_status()
        data = response.json()
        # GitHub returns README content as base64 encoded
        decoded = base64.b64decode(data["content"]).decode("utf-8", errors="ignore")
        # Limit to 3000 chars to avoid massive prompts
        return decoded[:3000]
    except httpx.HTTPStatusError:
        return "No README found."


async def fetch_file_tree(client: httpx.AsyncClient, owner: str, repo: str) -> str:
    """
    Fetches the full file tree of the repo.
    Returns a clean string listing of paths.
    """
    try:
        response = await client.get(
            f"{GITHUB_API_BASE}/repos/{owner}/{repo}/git/trees/HEAD?recursive=1",
            headers=HEADERS
        )
        response.raise_for_status()
        data = response.json()
        tree = data.get("tree", [])

        # Filter out binary/noise files, keep meaningful structure
        ignored_extensions = {
            ".png", ".jpg", ".jpeg", ".gif", ".svg", ".ico",
            ".woff", ".woff2", ".ttf", ".eot", ".mp4", ".zip"
        }
        ignored_folders = {
            "node_modules", ".git", "__pycache__",
            ".venv", "venv", "dist", "build", ".next"
        }

        paths = []
        for item in tree:
            path = item["path"]
            # Skip ignored folders
            if any(folder in path for folder in ignored_folders):
                continue
            # Skip binary files
            if any(path.endswith(ext) for ext in ignored_extensions):
                continue
            paths.append(path)

        # Limit to 150 paths to keep prompt size reasonable
        paths = paths[:150]
        return "\n".join(paths)

    except httpx.HTTPStatusError:
        return "Could not fetch file tree."


async def collect_repo_data(repo_url: str) -> dict:
    """
    Main function — orchestrates all GitHub API calls.
    Returns a single dict with everything the AI needs.
    """
    owner, repo = parse_github_url(repo_url)
    
    async with httpx.AsyncClient(timeout=20.0, follow_redirects=True) as client:
        metadata = await fetch_repo_metadata(client, owner, repo)
        readme = await fetch_readme(client, owner, repo)
        file_tree = await fetch_file_tree(client, owner, repo)

    return {
        "owner": owner,
        "repo": repo,
        "full_name": metadata.get("full_name", f"{owner}/{repo}"),
        "description": metadata.get("description", ""),
        "stars": metadata.get("stargazers_count", 0),
        "language": metadata.get("language", "Unknown"),
        "topics": metadata.get("topics", []),
        "readme": readme,
        "file_tree": file_tree,
    }