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
    Warmup: { video: "https://www.youtube.com/embed/jMoX-UJammY", desc: "Ball control warmup." },
    Technical: { video: "https://www.youtube.com/embed/vf0AkYAL6Ig", desc: "Passing & scanning." },
    Shooting: { video: "https://www.youtube.com/embed/QFJlRUy2jn0", desc: "Long shots." },
    Fitness: { video: "https://www.youtube.com/embed/8cCISQG1SuA", desc: "Endurance runs." },
    Recovery: { video: "https://www.youtube.com/embed/dKgWKzHe88E", desc: "Stretch & relax." }
  },
  Defender: {
    Warmup: { video: "https://www.youtube.com/embed/jMoX-UJammY", desc: "Defensive movement warmup." },
    Technical: { video: "https://www.youtube.com/embed/4vBZzkVRqbE", desc: "Tackling drills." },
    Shooting: { video: "https://www.youtube.com/embed/1yPMlA2tbGw", desc: "Prevent shots on goal " },
    Fitness: { video: "https://www.youtube.com/embed/9QpMOK4aSAI", desc: "Strength training." },
    Recovery: { video: "https://www.youtube.com/embed/dKgWKzHe88E", desc: "Recovery session." }
  },
  GK: {
    Warmup: { video: "https://www.youtube.com/embed/jMoX-UJammY", desc: "Reflex warmup." },
    Technical: { video: "https://www.youtube.com/embed/xliP62TKqIw", desc: "Basic goalkeeping skills." },
    Shooting: { video: "https://www.youtube.com/embed/1-m1X808FOI", desc: "Penalty saves." },
    Fitness: { video: "https://www.youtube.com/embed/MRKgjlRiLok", desc: "Explosive dives." },
    Recovery: { video: "https://www.youtube.com/embed/fmFOyxPeGZg", desc: "Mobility work." }
  }
};

const positions = ["Attacker", "Midfielder", "Defender", "GK"];
const phases = ["Warmup", "Technical", "Shooting", "Fitness", "Recovery"];

export default function ActiveWorkout() {
  const { position } = useParams();
  const navigate = useNavigate();

  const formattedPosition =
    position
      ? position.toLowerCase() === "gk"
        ? "GK"
        : position.charAt(0).toUpperCase() + position.slice(1).toLowerCase()
      : "Attacker";
  const positionClass = formattedPosition.toLowerCase();
  const [phase, setPhase] = useState("Warmup");

  console.log("URL:", position);

  useEffect(() => {
    if (!position) {
      navigate("/workout/Attacker", { replace: true });
    }
  }, [position, navigate]);

  const current = trainingData[formattedPosition]?.[phase];

  if (!trainingData[formattedPosition]) {
    return (
      <div style={{ padding: "100px", color: "white" }}>
        Invalid Position: {position}
      </div>
    );
  }

  return (
    <div className={`workout-page ${positionClass}`}>
      <div className="workout-container">

        {/* POSITION TABS */}
        <div className="position-tabs">
          {positions.map((pos) => (
            <button
              key={pos}
              onClick={() => {
                console.log("CLICK WORKING:", pos);
                navigate(`/workout/${pos}`);
                setPhase("Warmup");
              }}
              className={formattedPosition === pos ? "active" : ""}
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