import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import ProtectedAction from "../routes/ProtectedAction";
import useTimer from "../hooks/useTimer";
import "../App.css";
import attackerBg from "../assets/attack.jpg";
import midfielderBg from "../assets/mid.jpg";
import defenderBg from "../assets/def.jpg";
import gkBg from "../assets/gk.jpg";
import { addActivity, updateProgress, getCompletedPhases, markPhaseComplete } from "../utils/localStorage";

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
  const seconds = useTimer();

  const formattedPosition = (() => {
    if (!position) return "Attacker";
    const p = position.toLowerCase();
    if (p === "gk" || p === "goalkeeper") return "GK";
    return position.charAt(0).toUpperCase() + position.slice(1).toLowerCase();
  })();
  const [phase, setPhase] = useState("Warmup");
  const [completionState, setCompletionState] = useState({ loading: false, message: "" });
  const [completedPhases, setCompletedPhases] = useState({});

  const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  useEffect(() => {
    if (!position) {
      navigate("/workout/Attacker", { replace: true });
    }
    setCompletedPhases(getCompletedPhases());
  }, [position, navigate, formattedPosition]);

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

      addActivity({
        title: `${formattedPosition} ${phase}`,
        position: formattedPosition,
        phase: phase,
        date: new Date().toISOString(),
        durationMinutes: duration,
        xpEarned: xpByPhase[phase]
      });

      // Update progress
      updateProgress(phase, 100);

      // Mark phase as complete
      markPhaseComplete(formattedPosition, phase);
      setCompletedPhases(getCompletedPhases());

      setCompletionState({ loading: false, message: `Logged +${xpByPhase[phase]} XP to your dashboard.` });
      window.dispatchEvent(new Event("workout-completed"));
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
        <div className="video-box" style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", borderRadius: "12px" }}>
          <iframe
            src={current.video}
            title={`${formattedPosition} ${phase} Training`}
            allowFullScreen
            style={{
              position: "absolute",
              top: 0, left: 0,
              width: "100%", height: "100%",
              border: "none",
              borderRadius: "12px"
            }}
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
              {completedPhases[formattedPosition]?.includes(p) ? "✓ " : ""}{p}
            </button>
          ))}
        </div>

        {/* TEXT */}
        <div className="workout-text">
          <h2>{phase}</h2>
          <p className="workout-timer">⏱ {formatTime(seconds)}</p>
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
          <div aria-live="polite" role="status">
            {completionState.message && <p className="session-message">{completionState.message}</p>}
          </div>
        </div>

      </div>
    </div>
  );
}
