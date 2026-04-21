import "../App.css";
import { useNavigate } from "react-router-dom";

function Training() {
  const navigate = useNavigate();

  return (
    <div className="training-container">
      <h1 className="training-title">CR7 Training Modules</h1>

      {/* ATTACKER */}
      <div className="training-card">
        <h2>🔥 BA7 Finisher (Attacker)</h2>

        <p><b>Warm-up:</b> High knees, sprints, lateral movements</p>
        <p><b>Technical:</b> 1v1 dribbling, first touch control</p>
        <p><b>Shooting:</b> Box drills, power + placement</p>
        <p><b>Fitness:</b> Plyometrics, agility drills</p>
        <p><b>Recovery:</b> Jog + stretching</p>

        <button onClick={() => navigate("/workout", { state: { position: "Attacker" } })}>
          Start Workout
        </button>
      </div>

      {/* MIDFIELDER */}
      <div className="training-card">
        <h2>🎯 Midfield Maestro KV (Midfielder)</h2>

        <p><b>Warm-up:</b> Ball control movements</p>
        <p><b>Technical:</b> Passing + scanning drills</p>
        <p><b>Skills:</b> Turns, aerial control</p>
        <p><b>Fitness:</b> Box-to-box runs</p>
        <p><b>Recovery:</b> Foam rolling + hydration</p>

        <button onClick={() => navigate("/workout", { state: { position: "Midfielder" } })}>
          Start Workout
        </button>
      </div>

      {/* DEFENDER */}
      <div className="training-card">
        <h2>⚡ Defender Wall (Defender)</h2>

        <p><b>Warm-up:</b> Defensive movements</p>
        <p><b>Technical:</b> Clearances + tackling</p>
        <p><b>Fitness:</b> Suicide sprints</p>
        <p><b>Skills:</b> Fatigue dribbling</p>
        <p><b>Recovery:</b> Ice bath + stretching</p>

        <button onClick={() => navigate("/workout", { state: { position: "Defender" } })}>
          Start Workout
        </button>
      </div>

      {/* GOALKEEPER */}
      <div className="training-card">
        <h2>🧤 Goalkeeper Elite - KD (GK)</h2>

        <p><b>Warm-up:</b> Reaction drills, quick footwork</p>
        <p><b>Technical:</b> Shot stopping, positioning</p>
        <p><b>Skills:</b> Reflex saves, 1v1 blocking</p>
        <p><b>Fitness:</b> Explosive jumps</p>
        <p><b>Recovery:</b> Stretching</p>

        <button onClick={() => navigate("/workout", { state: { position: "Goalkeeper" } })}>
          Start Workout
        </button>
      </div>
    </div>
  );
}

export default Training;