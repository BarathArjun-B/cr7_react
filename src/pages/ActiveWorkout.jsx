import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import ProtectedAction from "../routes/ProtectedAction";
import "../App.css";
import attackerBg from "../assets/attack.jpg";
import midfielderBg from "../assets/mid.jpg";
import defenderBg from "../assets/def.jpg";
import gkBg from "../assets/gk.jpg";

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
const bgImages = {
  Attacker: attackerBg,
  Midfielder: midfielderBg,
  Defender: defenderBg,
  GK: gkBg
};

export default function ActiveWorkout() {
  const { position } = useParams();
  const navigate = useNavigate();

  const formattedPosition =
    position
      ? position.toLowerCase() === "gk"
        ? "GK"
        : position.charAt(0).toUpperCase() + position.slice(1).toLowerCase()
      : "Attacker";
  const [phase, setPhase] = useState("Warmup");
  const [completionState, setCompletionState] = useState({ loading: false, message: "" });

  useEffect(() => {
    if (!position) {
      navigate("/workout/Attacker", { replace: true });
    }
  }, [position, navigate]);

  const current = trainingData[formattedPosition]?.[phase];

  const promptLoginForProgress = (message) => {
    setCompletionState({ loading: false, message });
    setTimeout(() => {
      navigate("/login", {
        state: {
          from: { pathname: `/workout/${formattedPosition}` },
          authMessage: message
        }
      });
    }, 900);
    return true;
  };

  const completeCurrentWorkout = async () => {
    setCompletionState({ loading: true, message: "" });

    try {
      const xpByPhase = {
        Warmup: 35,
        Technical: 80,
        Shooting: 95,
        Fitness: 90,
        Recovery: 30
      };

      const duration = phase === "Recovery" ? 12 : 20;

      // Import these inside or use the ones imported at the top
      // We will add imports to the top of the file
      const { addActivity, updateProgress } = await import("../utils/localStorage");
      
      addActivity({
        title: `${formattedPosition} ${phase}`,
        position: formattedPosition,
        phase: phase,
        date: new Date().toISOString(),
        durationMinutes: duration,
        xpEarned: xpByPhase[phase]
      });

      // Update progress. Let's assume each time they complete, it adds 20% to that phase
      // This is simplified logic based on the user's prompt "Track which phases are completed"
      updateProgress(phase, 100);

      setCompletionState({ loading: false, message: `Logged +${xpByPhase[phase]} XP to your dashboard.` });
    } catch (error) {
      setCompletionState({
        loading: false,
        message: "Could not log workout. Try again."
      });
    }
  };

  if (!trainingData[formattedPosition]) {
    return (
      <div style={{ padding: "100px", color: "white" }}>
        Invalid Position: {position}
      </div>
    );
  }

  return (
    <div
      className="workout-page"
      style={{
        backgroundImage: `url(${bgImages[formattedPosition]})`
      }}
    >
      <div className="workout-container">

        {/* POSITION TABS */}
        <div className="position-tabs">
          {positions.map((pos) => (
            <button
              key={pos}
              onClick={() => {
                navigate(`/workout/${pos}`);
                setPhase("Warmup");
                setCompletionState({ loading: false, message: "" });
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
          <ProtectedAction onBlocked={promptLoginForProgress}>
            {({ runProtectedAction }) => (
              <button
                onClick={() => runProtectedAction(completeCurrentWorkout)}
                disabled={completionState.loading}
              >
                {completionState.loading ? "Logging session..." : "Complete Workout"}
              </button>
            )}
          </ProtectedAction>
          {completionState.message && <p className="session-message">{completionState.message}</p>}
        </div>

      </div>
    </div>
  );
}
