import { useNavigate } from "react-router-dom";
import "../App.css";

export default function PositionCard({ position, image, isFavorite }) {
  const navigate = useNavigate();

  return (
    <div 
      className={`position-card ${isFavorite ? "favorite" : ""}`} 
      style={{ 
        backgroundImage: `url(${image})`,
        border: isFavorite ? "2px solid var(--accent-color, #4ade80)" : "none",
        boxShadow: isFavorite ? "0 0 15px rgba(74, 222, 128, 0.4)" : "none"
      }}
      onClick={() => navigate(`/workout/${position}`)}
    >
      <div className="position-overlay">
        <h3>{position}</h3>
        <p>Start Training →</p>
      </div>
    </div>
  );
}
