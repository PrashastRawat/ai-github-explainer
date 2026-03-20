# AI GitHub Repo Explainer

Paste any public GitHub repository URL and get a plain-English AI explanation of the entire codebase — what it does, how it works, and how to run it.

**Live Demo:** https://ai-github-explainer.vercel.app

---

## What It Does

Most developers struggle to understand an unfamiliar codebase quickly. This tool solves that by:

- Fetching the README, file structure, and metadata from any public GitHub repo
- Sending that data to an AI (Groq LLaMA 3.3 70B)
- Returning a structured, beginner-friendly explanation in seconds

---

## Explanation Sections

Every repo gets explained across 6 sections:

| Section | What It Covers |
|---|---|
| What It Does | Plain-English summary of the project and the problem it solves |
| Technologies Used | Every framework, library, and tool with a brief description |
| Folder Structure | What each important folder and file does |
| System Architecture | How the components connect and data flows through the app |
| How To Run | Step-by-step local setup instructions |
| Key Features | The most important and interesting capabilities |

---

## Tech Stack

**Backend**
- Python 3.12
- FastAPI — REST API framework
- httpx — async HTTP client for GitHub API calls
- Groq API (LLaMA 3.3 70B) — AI analysis engine
- Pydantic — data validation
- Uvicorn — ASGI server

**Frontend**
- React 18 (Vite)
- Inline CSS with CSS-in-JS styling
- Google Fonts: Geo (headings) + Play (body)
- Two themes: Matrix (dark) and Sakura (light)

**Deployment**
- Backend: Render
- Frontend: Vercel

---

## Project Structure

\`\`\`
ai-github-explainer/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI app, CORS config
│   │   ├── config.py            # Environment variable loading
│   │   ├── routers/
│   │   │   └── analyze.py       # POST /api/analyze endpoint
│   │   ├── services/
│   │   │   ├── github_service.py  # GitHub API integration
│   │   │   └── ai_service.py      # Groq AI prompt and parsing
│   │   └── models/
│   │       └── schemas.py       # Pydantic request/response models
│   ├── requirements.txt
│   └── .env.example
│
└── frontend/
    └── src/
        ├── App.jsx              # Root component, theme toggle
        ├── services/
        │   └── api.js           # Backend API calls
        └── components/
            ├── UrlInput.jsx     # URL input form
            ├── RepoExplainer.jsx  # Results layout
            ├── SectionCard.jsx  # Individual explanation card
            └── LoadingSpinner.jsx  # Animated terminal loader
\`\`\`

---

## How To Run Locally

### Prerequisites
- Python 3.10+
- Node.js 18+
- Groq API key (free at console.groq.com)
- GitHub Personal Access Token

### 1. Clone the repo

\`\`\`bash
git clone https://github.com/PrashastRawat/ai-github-explainer.git
cd ai-github-explainer
\`\`\`

### 2. Backend setup

\`\`\`bash
cd backend
python -m venv venv
venv\Scripts\activate       # Windows
source venv/bin/activate    # Mac/Linux

pip install -r requirements.txt
\`\`\`

Create your \`.env\` file:

\`\`\`env
GITHUB_TOKEN=your_github_personal_access_token
OPENAI_API_KEY=your_groq_api_key
\`\`\`

Start the backend:

\`\`\`bash
uvicorn app.main:app --reload
\`\`\`

Backend runs at: http://localhost:8000
API docs at: http://localhost:8000/docs

### 3. Frontend setup

\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

Frontend runs at: http://localhost:5173

---

## How It Works

\`\`\`
User pastes GitHub URL
        |
        v
FastAPI parses owner + repo name
        |
        v
GitHub REST API fetches:
  - Repository metadata (stars, language, topics)
  - README.md content (first 3000 chars)
  - Full file tree (up to 150 paths)
        |
        v
AI prompt is built with all repo data
        |
        v
Groq LLaMA 3.3 70B generates structured JSON explanation
        |
        v
React displays explanation in 6 section cards
\`\`\`

---

## Environment Variables

### Backend (.env)

| Variable | Description |
|---|---|
| GITHUB_TOKEN | GitHub Personal Access Token (public_repo scope) |
| OPENAI_API_KEY | Groq API key (used as OpenAI-compatible endpoint) |

### Frontend (.env)

| Variable | Description |
|---|---|
| VITE_API_URL | Backend URL e.g. https://your-api.onrender.com/api |

---

## Deployment

### Backend on Render

- Runtime: Python
- Root directory: backend
- Build command: pip install -r requirements.txt
- Start command: uvicorn app.main:app --host 0.0.0.0 --port \$PORT
- Add GITHUB_TOKEN and OPENAI_API_KEY as environment variables

### Frontend on Vercel

- Framework: Vite
- Root directory: frontend
- Add VITE_API_URL as environment variable pointing to your Render URL

---

## Screenshots

### Matrix Mode (Dark)
> Green on black terminal aesthetic with scanlines and matrix rain effect

### Sakura Mode (Light)
> Pink cherry blossom theme with floating petal animations

---

## Built By

**Prashast Rawat**
- GitHub: github.com/PrashastRawat