import { useState } from "react";
import UrlInput from "./components/UrlInput";
import RepoExplainer from "./components/RepoExplainer";
import LoadingSpinner from "./components/LoadingSpinner";
import { analyzeRepo } from "./services/api";

export default function App() {
  const [dark, setDark] = useState(true);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [transitioning, setTransitioning] = useState(false);

  const toggleTheme = () => {
    setTransitioning(true);
    setTimeout(() => {
      setDark(d => !d);
      setTransitioning(false);
    }, 250);
  };

  const handleAnalyze = async (url) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await analyzeRepo(url);
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.detail || "Connection failed. Check the URL and try again.");
    } finally {
      setLoading(false);
    }
  };

  const bg = dark ? "#050f07" : "#fff0f5";
  const border = dark ? "#00ff4120" : "#e8a0bc40";
  const titleColor = dark ? "#00ff41" : "#8b1a4a";
  const dimColor = dark ? "#2a7a3a" : "#c07090";
  const accentColor = dark ? "#00ff41" : "#c0427a";
  const scanlineColor = dark ? "rgba(0,255,65,0.03)" : "rgba(192,66,122,0.04)";

  return (
    <div style={{
      minHeight: "100vh",
      background: bg,
      transition: "all 0.35s ease",
      opacity: transitioning ? 0 : 1,
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @keyframes flicker {
          0%,94%,100%{opacity:1} 95%{opacity:0.5} 97%{opacity:0.85} 99%{opacity:0.6}
        }
        @keyframes sakuraDrift {
          0%{transform:translateY(-20px) rotate(0deg);opacity:0}
          10%{opacity:0.7}
          90%{opacity:0.3}
          100%{transform:translateY(105vh) rotate(380deg);opacity:0}
        }
        @keyframes matrixDrop {
          0%{transform:translateY(-100px);opacity:0}
          10%{opacity:0.2}
          90%{opacity:0.1}
          100%{transform:translateY(105vh);opacity:0}
        }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: ${bg}; }
        ::-webkit-scrollbar-thumb { background: ${accentColor}44; border-radius: 3px; }
      `}</style>

      {/* Scanline overlay */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9998,
        backgroundImage: `repeating-linear-gradient(
          0deg, transparent, transparent 2px,
          ${scanlineColor} 2px, ${scanlineColor} 4px
        )`,
      }} />

      {/* Sakura petals - light mode */}
      {!dark && ["#ffb7c5","#ffccd5","#ff8fab","#ffc8dd","#ff85a1","#ffa8ba","#ff6b9d","#ffb3c6"].map((color, i) => (
        <div key={i} style={{
          position: "fixed",
          left: `${8 + i * 11}%`,
          top: "-20px",
          width: i % 3 === 0 ? "12px" : "8px",
          height: i % 3 === 0 ? "12px" : "8px",
          borderRadius: "50% 0 50% 0",
          background: color,
          opacity: 0.8,
          animation: `sakuraDrift ${9 + i * 1.8}s ${i * 1.2}s linear infinite`,
          pointerEvents: "none",
          zIndex: 1,
        }} />
      ))}

      {/* Matrix drops - dark mode */}
      {dark && [0,1,2,3,4,5,6,7].map(i => (
        <div key={i} style={{
          position: "fixed",
          left: `${4 + i * 12}%`,
          top: 0,
          width: "1px",
          height: "80px",
          background: `linear-gradient(to bottom, transparent, #00ff41, transparent)`,
          animation: `matrixDrop ${4 + i * 0.6}s ${i * 0.4}s linear infinite`,
          opacity: 0.12,
          pointerEvents: "none",
          zIndex: 1,
        }} />
      ))}

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem 1.5rem", position: "relative", zIndex: 2 }}>

        {/* Header */}
        <header style={{ textAlign: "center", marginBottom: "2.5rem", position: "relative" }}>
          <div style={{
            fontSize: "0.65rem", color: dimColor,
            letterSpacing: "3px", marginBottom: "0.75rem",
            fontFamily: "'Play', monospace",
          }}>
            {dark
              ? "> SYSTEM ONLINE // AI_REPO_ANALYSIS_ENGINE v2.4.1"
              : "? AI REPO EXPLAINER // ANALYSIS SYSTEM ACTIVE ?"}
          </div>

          <h1 style={{
            fontFamily: "'Geo', sans-serif",
            fontSize: "clamp(2rem, 6vw, 3.8rem)",
            color: titleColor,
            letterSpacing: dark ? "6px" : "3px",
            textShadow: dark
              ? "0 0 30px #00ff41, 0 0 60px #00b32c55"
              : "0 0 20px #c0427a44, 2px 2px 0 #f0c0d0",
            animation: dark ? "flicker 8s infinite" : "none",
            margin: "0 0 0.5rem",
            lineHeight: 1.1,
          }}>
            {dark ? "AI_REPO_EXPLAINER" : "AI Repo Explainer"}
          </h1>

          <p style={{
            color: dimColor, fontSize: "0.75rem",
            letterSpacing: "2px", fontFamily: "'Play', monospace",
          }}>
            {dark
              ? "// neural analysis system // powered by groq llm //"
              : "? paste any github url and get a beautiful explanation ?"}
          </p>

          {/* Theme toggle button */}
          <button
            onClick={toggleTheme}
            style={{
              position: "absolute", right: 0, top: "50%",
              transform: "translateY(-50%)",
              background: "transparent",
              border: `1px solid ${accentColor}55`,
              color: accentColor,
              padding: "0.5rem 1rem",
              borderRadius: dark ? "3px" : "20px",
              fontFamily: "'Play', monospace",
              fontSize: "0.72rem",
              cursor: "pointer",
              letterSpacing: "1px",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 16px ${accentColor}44`}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
          >
            {dark ? "? SAKURA MODE" : "? MATRIX MODE"}
          </button>
        </header>

        <UrlInput onAnalyze={handleAnalyze} loading={loading} dark={dark} />

        {loading && <LoadingSpinner dark={dark} />}

        {error && (
          <div style={{
            border: `1px solid ${dark ? "#ff004055" : "#c0427a55"}`,
            background: dark ? "#1a0008" : "#fff0f5",
            color: dark ? "#ff0040" : "#8b1a4a",
            padding: "1rem 1.25rem",
            borderRadius: dark ? "3px" : "12px",
            margin: "1rem 0",
            fontFamily: "'Play', monospace",
            fontSize: "0.85rem",
            letterSpacing: "1px",
          }}>
            {dark ? "[ERR] " : "? "}{error}
          </div>
        )}

        {result && <RepoExplainer data={result} dark={dark} />}

        <footer style={{
          textAlign: "center",
          marginTop: "3rem",
          paddingTop: "1rem",
          borderTop: `1px solid ${border}`,
          fontSize: "0.6rem",
          color: dimColor,
          letterSpacing: "2px",
          fontFamily: "'Play', monospace",
        }}>
          {dark
            ? "[ SYSTEM: AI_GITHUB_EXPLAINER ] [ STATUS: ONLINE ] [ BUILD: 2.4.1 ]"
            : "? ai github explainer ? built with fastapi + groq + react ?"}
        </footer>
      </div>
    </div>
  );
}
