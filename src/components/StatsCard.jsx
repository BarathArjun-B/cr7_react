import "../App.css";

export default function StatsCard({ title, value, subtitle }) {
  return (
    <div className="stats-card">
      <h3>{title}</h3>
      <div className="stats-value">{value}</div>
      {subtitle && <p className="stats-subtitle">{subtitle}</p>}
    </div>
  );
}
