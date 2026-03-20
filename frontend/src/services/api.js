const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export const analyzeRepo = async (repoUrl) => {
  const response = await fetch(`${API_BASE}/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ repo_url: repoUrl }),
  });
  if (!response.ok) {
    const err = await response.json();
    throw { response: { data: err } };
  }
  return response.json();
};
