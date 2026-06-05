import "../App.css";

export default function ProgressBar({ progress }) {
  const phases = ["warmup", "technical", "shooting", "fitness", "recovery"];
  
  return (
    <div className="progress-container">
      <h3>Phase Completion</h3>
      {phases.map(phase => {
        const percentage = progress[phase] || 0;
        return (
          <div key={phase} className="progress-row">
            <span className="progress-label" style={{ textTransform: "capitalize" }}>{phase}</span>
            <div className="progress-bar-bg">
              <div 
                className="progress-bar-fill" 
                style={{ 
                  width: `${percentage}%`,
                  backgroundColor: percentage === 100 ? "#4ade80" : "#60a5fa"
                }} 
              />
            </div>
            <span className="progress-percentage">{percentage}%</span>
          </div>
        );
      })}
    </div>
  );
}
