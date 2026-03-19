import { useState } from "react";

export default function UrlInput({ onAnalyze, loading, dark }) {
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim()) onAnalyze(url.trim());
  };

  const cardBg = dark ? "#080f09" : "#fff8fb";
  const border = dark ? "#00ff4120" : "#e8a0bc40";
  const accentColor = dark ? "#00ff41" : "#c0427a";
  const dimColor = dark ? "#2a7a3a" : "#c07090";

  return (
    <div style={{
      background: cardBg,
      border: `1px solid ${border}`,
      borderRadius: dark ? "4px" : "16px",
      padding: "1.5rem",
      marginBottom: "2rem",
    }}>
      <div style={{
        fontSize: "0.65rem", color: dimColor,
        letterSpacing: "2px", marginBottom: "1rem",
        fontFamily: "'Play', monospace",
      }}>
        {dark ? "// ENTER TARGET REPOSITORY" : "? enter repository url below"}
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.75rem" }}>
        <div style={{
          flex: 1, display: "flex", alignItems: "center",
          border: `1px solid ${accentColor}44`,
          borderRadius: dark ? "3px" : "12px",
          padding: "0 0.75rem",
          background: dark ? "#000" : "#fff",
        }}>
          <span style={{
            color: accentColor, marginRight: "0.5rem",
            fontSize: "0.9rem", userSelect: "none",
          }}>
            {dark ? "$>" : "?"}
          </span>
          <input
            type="text"
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="https://github.com/owner/repo"
            disabled={loading}
            autoFocus
            style={{
              flex: 1, background: "transparent",
              border: "none", outline: "none",
              color: dark ? accentColor : "#8b1a4a",
              fontFamily: "'Play', monospace",
              fontSize: "0.9rem",
              padding: "0.75rem 0",
              caretColor: accentColor,
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading || !url.trim()}
          style={{
            padding: "0.75rem 1.5rem",
            background: "transparent",
            color: loading ? dimColor : accentColor,
            border: `1px solid ${loading ? dimColor : accentColor}`,
            borderRadius: dark ? "3px" : "12px",
            fontFamily: "'Play', monospace",
            fontSize: "0.8rem",
            letterSpacing: dark ? "2px" : "1px",
            cursor: loading || !url.trim() ? "not-allowed" : "pointer",
            whiteSpace: "nowrap",
            opacity: !url.trim() ? 0.5 : 1,
            transition: "all 0.2s",
          }}
        >
          {loading
            ? (dark ? "SCANNING..." : "? Analyzing...")
            : (dark ? "[ ANALYZE ]" : "? Analyze")}
        </button>
      </form>
    </div>
  );
}
