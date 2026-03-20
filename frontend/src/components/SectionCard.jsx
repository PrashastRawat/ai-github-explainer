function renderValue(value, dark) {
  const textColor = dark ? "#b6ffcc" : "#4a1a2a";
  const accentColor = dark ? "#00ff41" : "#c0427a";
  const borderColor = dark ? "#0d2e14" : "#f0c8d8";

  if (typeof value === "string") {
    return (
      <p style={{ color: textColor, lineHeight: 1.8, fontFamily: "Play, monospace", fontSize: "0.88rem" }}>
        {value}
      </p>
    );
  }
  if (Array.isArray(value)) {
    return (
      <ul style={{ listStyle: "none", padding: 0 }}>
        {value.map((item, i) => (
          <li key={i} style={{ padding: "0.45rem 0", borderBottom: `1px solid ${borderColor}`, fontFamily: "Play, monospace", fontSize: "0.85rem", color: textColor, display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
            <span style={{ color: accentColor, flexShrink: 0 }}>{dark ? ">" : "*"}</span>
            {typeof item === "object" ? (
              <span>
                <strong style={{ color: accentColor }}>
                  {item.name || (item.step && `Step ${item.step}`) || Object.keys(item)[0]}:
                </strong>{" "}
                {item.description || item.value || Object.values(item)[1]}
              </span>
            ) : (
              <span>{item}</span>
            )}
          </li>
        ))}
      </ul>
    );
  }
  if (typeof value === "object" && value !== null) {
    return (
      <ul style={{ listStyle: "none", padding: 0 }}>
        {Object.entries(value).map(([k, v]) => (
          <li key={k} style={{ padding: "0.35rem 0", borderBottom: `1px solid ${borderColor}`, color: textColor, fontFamily: "Play, monospace", fontSize: "0.85rem" }}>
            <strong style={{ color: accentColor }}>{k}:</strong>{" "}
            {typeof v === "string" ? v : JSON.stringify(v)}
          </li>
        ))}
      </ul>
    );
  }
  return <p style={{ color: textColor }}>{String(value)}</p>;
}

export default function SectionCard({ title, icon, content, dark }) {
  const cardBg = dark ? "#080f09" : "#fff8fb";
  const border = dark ? "#00ff4120" : "#e8a0bc40";
  const titleColor = dark ? "#00ff41" : "#8b1a4a";

  return (
    <div
      style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: dark ? "4px" : "16px", padding: "1.25rem", position: "relative", overflow: "hidden", transition: "border-color 0.25s, box-shadow 0.25s, transform 0.2s" }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = dark ? "#00ff4155" : "#c0427a88";
        e.currentTarget.style.boxShadow = dark ? "0 0 24px rgba(0,255,65,0.12)" : "0 0 24px rgba(192,66,122,0.15)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = border;
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: dark ? "linear-gradient(90deg, transparent, #00ff41, transparent)" : "linear-gradient(90deg, transparent, #c0427a, transparent)", opacity: 0.5 }} />
      <h2 style={{ fontFamily: "Geo, sans-serif", fontSize: "1.1rem", color: titleColor, letterSpacing: dark ? "2px" : "1px", marginBottom: "1rem", paddingBottom: "0.5rem", borderBottom: `1px solid ${border}`, textShadow: dark ? "0 0 8px #00ff4144" : "none", display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span style={{ opacity: 0.7 }}>{icon}</span>
        {title}
      </h2>
      {renderValue(content, dark)}
    </div>
  );
}