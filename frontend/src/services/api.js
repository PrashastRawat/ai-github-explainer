import axios from "axios";

const API_BASE = "http://localhost:8000/api";

export const analyzeRepo = async (repoUrl) => {
  const response = await axios.post(`${API_BASE}/analyze`, {
    repo_url: repoUrl,
  });
  return response.data;
};
