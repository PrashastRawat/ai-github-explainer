import SectionCard from "./SectionCard";

const SECTIONS = [
  { key: "what_it_does",    title: "What It Does",        icon: "?" },
  { key: "technologies",    title: "Technologies Used",   icon: "?" },
  { key: "folder_structure",title: "Folder Structure",    icon: "?" },
  { key: "architecture",    title: "System Architecture", icon: "?" },
  { key: "how_to_run",      title: "How To Run",          icon: "?" },
  { key: "key_features",    title: "Key Features",        icon: "?" },
];

export default function RepoExplainer({ data, dark }) {
  const cardBg = dark ? "#080f09" : "#fff8fb";
  const border = dark ? "#00ff4120" : "#e8a0bc40";
  const titleColor = dark ? "#00ff41" : "#8b1a4a";
  const dimColor = dark ? "#2a7a3a" : "#c07090";

  return (
    <div>
      <style>{`
        @keyframes fadeSlideIn {
          from{opacity:0;transform:translateY(16px)}
          to{opacity:1;transform:translateY(0)}
        }
      `}</style>

      <div style={{
        background: cardBg,
        border: `1px solid ${border}`,
        borderRadius: dark ? "4px" : "16px",
        padding: "1.5rem",
        marginBottom: "1.5rem",
        animation: "fadeSlideIn 0.5s ease forwards",
      }}>
        <div style={{
          fontSize: "0.6rem", color: dimColor,
          letterSpacing: "3px", marginBottom: "0.75rem",
          fontFamily: "'Play', monospace",
        }}>
          {dark ? "// TARGET ACQUIRED" : "? repository found"}
        </div>

        <h2 style={{
          fontFamily: "'Geo', sans-serif",
          fontSize: "1.8rem",
          color: titleColor,
          textShadow: dark ? "0 0 12px #00ff4155" : "none",
          marginBottom: "0.4rem",
          letterSpacing: dark ? "3px" : "1px",
        }}>
          {data.repo_name}
        </h2>

        <p style={{
          color: dimColor, fontSize: "0.82rem",
          marginBottom: "0.75rem",
          fontFamily: "'Play', monospace",
          lineHeight: 1.6,
        }}>
          {data.description}
        </p>

        <div style={{
          display: "flex", gap: "1.5rem",
          fontSize: "0.72rem", color: dimColor,
          borderTop: `1px solid ${border}`,
          paddingTop: "0.75rem",
          fontFamily: "'Play', monospace",
        }}>
          <span>{dark ? "> " : "? "}{data.stars?.toLocaleString()} stars</span>
          <span>{dark ? "> " : "? "}{data.language}</span>
        </div>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(460px, 1fr))",
        gap: "1rem",
      }}>
        {SECTIONS.map(({ key, title, icon }, idx) => (
          <div key={key} style={{
            animation: `fadeSlideIn 0.5s ${idx * 0.08}s ease both`,
          }}>
            <SectionCard
              title={title}
              icon={icon}
              content={data.explanation[key]}
              dark={dark}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
