from openai import AsyncOpenAI
from app.config import settings
import json

client = AsyncOpenAI(
    api_key=settings.OPENAI_API_KEY,
    base_url="https://api.groq.com/openai/v1"
)


def build_prompt(repo_data: dict) -> str:
    return f"""
You are an expert software engineer and technical writer.
Analyze the following GitHub repository data and explain it in simple, beginner-friendly language.

REPOSITORY: {repo_data["full_name"]}
DESCRIPTION: {repo_data["description"]}
PRIMARY LANGUAGE: {repo_data["language"]}
TOPICS: {", ".join(repo_data["topics"])}
STARS: {repo_data["stars"]}

README CONTENT:
{repo_data["readme"]}

FILE STRUCTURE:
{repo_data["file_tree"]}

Return ONLY valid JSON, no markdown, no code blocks, no extra text.

{{
  "what_it_does": "2-3 paragraph explanation of what this project does and what problem it solves.",
  "technologies": "List and briefly explain every major technology used.",
  "folder_structure": "Walk through the most important folders and files.",
  "architecture": "Explain how the different parts connect and work together.",
  "how_to_run": "Step by step instructions to set up and run this project locally.",
  "key_features": "List and explain the most important features of this project."
}}
"""


async def analyze_with_ai(repo_data: dict) -> dict:
    prompt = build_prompt(repo_data)

    response = await client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": "You are a helpful technical explainer. Always respond with valid JSON only. No markdown, no code fences."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.3,
        max_tokens=2000
    )

    raw = response.choices[0].message.content.strip()

    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        start = raw.find("{")
        end = raw.rfind("}") + 1
        return json.loads(raw[start:end])
