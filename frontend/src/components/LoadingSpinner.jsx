export default function LoadingSpinner({ dark }) {
  const cardBg = dark ? "#080f09" : "#fff8fb";
  const border = dark ? "#00ff4120" : "#e8a0bc40";
  const dimColor = dark ? "#2a7a3a" : "#c07090";
  const accentColor = dark ? "#00ff41" : "#c0427a";

  const lines = [
    { status: "OK", text: "Connection established to GitHub API", delay: "0s" },
    { status: "OK", text: "Fetching repository metadata...", delay: "0.6s" },
    { status: "OK", text: "Parsing file structure and README...", delay: "1.2s" },
    { status: "~~", text: "Running AI analysis engine...", delay: "1.8s" },
    { status: "~~", text: "Generating report", delay: "2.4s", blink: true },
  ];

  return (
    <div style={{
      background: cardBg,
      border: `1px solid ${border}`,
      borderRadius: dark ? "4px" : "16px",
      padding: "1.5rem",
      margin: "1rem 0",
      fontFamily: "'Play', monospace",
      fontSize: "0.82rem",
      letterSpacing: "1px",
    }}>
      <style>{`
        @keyframes fadeInLine { from{opacity:0;transform:translateX(-8px)} to{opacity:1;transform:translateX(0)} }
        @keyframes blink { 50%{opacity:0} }
      `}</style>

      {lines.map((line, i) => (
        <div key={i} style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          padding: "0.35rem 0",
          opacity: 0,
          animation: `fadeInLine 0.4s ${line.delay} ease forwards`,
        }}>
          <span style={{
            color: line.status === "OK" ? accentColor : "#ffaa00",
            fontWeight: 700,
          }}>
            [{line.status}]
          </span>
          <span style={{ color: dimColor }}>
            {line.text}
            {line.blink && (
              <span style={{ animation: "blink 1s step-end infinite" }}>_</span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
}
