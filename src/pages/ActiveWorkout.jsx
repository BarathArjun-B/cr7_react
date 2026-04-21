import { useState } from "react";
import { useLocation } from "react-router-dom";

const trainingData = {
  Attacker: {
    Warmup: {
      video: "https://www.youtube.com/embed/TIYKpqko9PY",
      desc: "High knees, sprint activation"
    },
    Technical: {
      video: "https://www.youtube.com/embed/1w7OgIMMRc4",
      desc: "1v1 dribbling + ball mastery"
    },
    Shooting: {
      video: "https://www.youtube.com/embed/kJQP7kiw5Fk",
      desc: "Finishing drills with power & placement"
    },
    Fitness: {
      video: "https://www.youtube.com/embed/3JZ_D3ELwOQ",
      desc: "Explosive sprint + agility work"
    },
    Recovery: {
      video: "https://www.youtube.com/embed/9bZkp7q19f0",
      desc: "Stretching + cooldown routine"
    }
  },

  Midfielder: {
    Warmup: {
      video: "https://www.youtube.com/embed/2Vv-BfVoq4g",
      desc: "Ball control warmup"
    },
    Technical: {
      video: "https://www.youtube.com/embed/1w7OgIMMRc4",
      desc: "Passing + scanning drills"
    },
    Shooting: {
      video: "https://www.youtube.com/embed/kJQP7kiw5Fk",
      desc: "Long-range shooting"
    },
    Fitness: {
      video: "https://www.youtube.com/embed/3JZ_D3ELwOQ",
      desc: "Endurance runs"
    },
    Recovery: {
      video: "https://www.youtube.com/embed/9bZkp7q19f0",
      desc: "Cooldown"
    }
  },

  Defender: {
    Warmup: {
      video: "https://www.youtube.com/embed/2Vv-BfVoq4g",
      desc: "Defensive footwork"
    },
    Technical: {
      video: "https://www.youtube.com/embed/1w7OgIMMRc4",
      desc: "Tackling + positioning"
    },
    Shooting: {
      video: "https://www.youtube.com/embed/kJQP7kiw5Fk",
      desc: "Clearances"
    },
    Fitness: {
      video: "https://www.youtube.com/embed/3JZ_D3ELwOQ",
      desc: "Strength training"
    },
    Recovery: {
      video: "https://www.youtube.com/embed/9bZkp7q19f0",
      desc: "Stretching"
    }
  },

  Goalkeeper: {
    Warmup: {
      video: "https://www.youtube.com/embed/2Vv-BfVoq4g",
      desc: "Reaction drills"
    },
    Technical: {
      video: "https://www.youtube.com/embed/1w7OgIMMRc4",
      desc: "Shot stopping"
    },
    Shooting: {
      video: "https://www.youtube.com/embed/kJQP7kiw5Fk",
      desc: "Distribution"
    },
    Fitness: {
      video: "https://www.youtube.com/embed/3JZ_D3ELwOQ",
      desc: "Explosive dives"
    },
    Recovery: {
      video: "https://www.youtube.com/embed/9bZkp7q19f0",
      desc: "Mobility work"
    }
  }
};

const phases = ["Warmup", "Technical", "Shooting", "Fitness", "Recovery"];

function ActiveWorkout() {
  const location = useLocation();

  const defaultPosition = location.state?.position || "Attacker";

  const [position, setPosition] = useState(defaultPosition);
  const [activePhase, setActivePhase] = useState("Warmup");

  const current = trainingData[position][activePhase];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center pt-28">

      <div className="max-w-5xl w-full px-4 py-12 flex flex-col items-center gap-8">

        {/* POSITION SELECTOR */}
        <div className="flex gap-4">
          {Object.keys(trainingData).map((pos) => (
            <button
              key={pos}
              onClick={() => {
                setPosition(pos);
                setActivePhase("Warmup");
              }}
              className={`px-6 py-2 rounded-full font-semibold ${
                position === pos
                  ? "bg-green-500 text-black"
                  : "bg-gray-800 text-gray-400"
              }`}
            >
              {pos}
            </button>
          ))}
        </div>

        {/* VIDEO */}
        <div className="w-full aspect-video max-w-4xl rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
          <iframe
            src={current.video}
            className="w-full h-full"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>

        {/* PHASES */}
        <div className="flex gap-6">
          {phases.map((phase) => (
            <button
              key={phase}
              onClick={() => setActivePhase(phase)}
              className={`${
                activePhase === phase
                  ? "text-green-400 border-b-2 border-green-400"
                  : "text-gray-400"
              }`}
            >
              {phase}
            </button>
          ))}
        </div>

        {/* TEXT */}
        <div className="text-center">
          <h2 className="text-3xl font-bold">{activePhase}</h2>
          <p className="text-gray-400">{current.desc}</p>
        </div>

        {/* BUTTON */}
        <button className="px-6 py-3 bg-green-500 text-black rounded-lg">
          Mark Phase as Complete
        </button>
      </div>
    </div>
  );
}

export default ActiveWorkout;