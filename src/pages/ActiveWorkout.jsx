import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../App.css";

const trainingData = {
  Attacker: {
    Warmup: { video: "https://www.youtube.com/embed/jMoX-UJammY", desc: "Explosive warmup for attackers." },
    Technical: { video: "https://www.youtube.com/embed/vUrl1dm2GD8", desc: "Dribbling & ball mastery." },
    Shooting: { video: "https://www.youtube.com/embed/Pjej_jadea8", desc: "Finishing drills." },
    Fitness: { video: "https://www.youtube.com/embed/8cCISQG1SuA", desc: "Sprint & agility." },
    Recovery: { video: "https://www.youtube.com/embed/dKgWKzHe88E", desc: "Cooldown & stretch." }
  },
  Midfielder: {
    Warmup: { video: "https://www.youtube.com/embed/2Vv-BfVoq4g", desc: "Ball control warmup." },
    Technical: { video: "https://www.youtube.com/embed/1w7OgIMMRc4", desc: "Passing & scanning." },
    Shooting: { video: "https://www.youtube.com/embed/kJQP7kiw5Fk", desc: "Long shots." },
    Fitness: { video: "https://www.youtube.com/embed/3JZ_D3ELwOQ", desc: "Endurance runs." },
    Recovery: { video: "https://www.youtube.com/embed/9bZkp7q19f0", desc: "Stretch & relax." }
  },
  Defender: {
    Warmup: { video: "https://www.youtube.com/embed/2Vv-BfVoq4g", desc: "Defensive movement warmup." },
    Technical: { video: "https://www.youtube.com/embed/1w7OgIMMRc4", desc: "Tackling drills." },
    Shooting: { video: "https://www.youtube.com/embed/kJQP7kiw5Fk", desc: "Clearances." },
    Fitness: { video: "https://www.youtube.com/embed/3JZ_D3ELwOQ", desc: "Strength training." },
    Recovery: { video: "https://www.youtube.com/embed/9bZkp7q19f0", desc: "Recovery session." }
  },
  GK: {
    Warmup: { video: "https://www.youtube.com/embed/TIYKpqko9PY", desc: "Reflex warmup." },
    Technical: { video: "https://www.youtube.com/embed/1w7OgIMMRc4", desc: "Shot stopping." },
    Shooting: { video: "https://www.youtube.com/embed/kJQP7kiw5Fk", desc: "Distribution." },
    Fitness: { video: "https://www.youtube.com/embed/3JZ_D3ELwOQ", desc: "Explosive dives." },
    Recovery: { video: "https://www.youtube.com/embed/9bZkp7q19f0", desc: "Mobility work." }
  }
};

const positions = ["Attacker", "Midfielder", "Defender", "GK"];
const phases = ["Warmup", "Technical", "Shooting", "Fitness", "Recovery"];

export default function ActiveWorkout() {
  const { position } = useParams();
  const navigate = useNavigate();

  const currentPosition = position || "Attacker";
  const [phase, setPhase] = useState("Warmup");

  useEffect(() => {
    if (!position) {
      navigate("/workout/Attacker", { replace: true });
    }
  }, [position, navigate]);

  const current = trainingData[currentPosition]?.[phase];

  if (!trainingData[currentPosition]) {
    return <div style={{ padding: "100px", color: "white" }}>Invalid Position</div>;
  }

  return (
    <div className="workout-page">
      <div className="workout-container">

        {/* POSITION TABS */}
        <div className="position-tabs">
          {positions.map((pos) => (
            <button
              key={pos}
              onClick={() => {
                navigate(`/workout/${pos}`);
                setPhase("Warmup");
              }}
              className={currentPosition === pos ? "active" : ""}
            >
              {pos}
            </button>
          ))}
        </div>

        {/* VIDEO */}
        <div className="video-box">
          <iframe
            src={current.video}
            title="Workout Video"
            allowFullScreen
          ></iframe>
        </div>

        {/* PHASE TABS */}
        <div className="phase-tabs">
          {phases.map((p) => (
            <button
              key={p}
              onClick={() => setPhase(p)}
              className={phase === p ? "active" : ""}
            >
              {p}
            </button>
          ))}
        </div>

        {/* TEXT */}
        <div className="workout-text">
          <h2>{phase}</h2>
          <p>{current.desc}</p>
          <button>Start Workout</button>
        </div>

      </div>
    </div>
  );
}