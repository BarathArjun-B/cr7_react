import { useState } from "react";

const trainingData = {
  Attacker: {
    Warmup: { video: "https://www.youtube.com/embed/TIYKpqko9PY", desc: "Explosive warmup for attackers." },
    Technical: { video: "https://www.youtube.com/embed/1w7OgIMMRc4", desc: "Dribbling & ball mastery." },
    Shooting: { video: "https://www.youtube.com/embed/kJQP7kiw5Fk", desc: "Finishing drills." },
    Fitness: { video: "https://www.youtube.com/embed/3JZ_D3ELwOQ", desc: "Sprint & agility." },
    Recovery: { video: "https://www.youtube.com/embed/9bZkp7q19f0", desc: "Cooldown & stretch." }
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
  const [position, setPosition] = useState("Attacker");
  const [phase, setPhase] = useState("Warmup");

  const current = trainingData[position][phase];

  return (
    <div className="min-h-screen bg-[#111827] text-white">

      {/* 🔹 NAVBAR */}
      <div className="w-full flex justify-between items-center px-8 py-5 border-b border-gray-800">
        <div className="text-[#4ade80] font-bold text-lg">⚽ ProTraining</div>

        <div className="flex gap-6 text-gray-400">
          <span className="hover:text-white cursor-pointer">Workouts</span>
          <span className="hover:text-white cursor-pointer">Progress</span>
          <span className="hover:text-white cursor-pointer">Schedule</span>
        </div>
      </div>

      {/* 🔹 MAIN CONTAINER */}
      <div className="flex flex-col items-center pt-10 px-4 w-full">

        {/* 🔹 POSITION PILLS */}
        <div className="flex gap-3 flex-wrap justify-center">
          {positions.map((pos) => (
            <button
              key={pos}
              onClick={() => {
                setPosition(pos);
                setPhase("Warmup");
              }}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all
                ${
                  position === pos
                    ? "bg-[#4ade80] text-black"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
            >
              {pos}
            </button>
          ))}
        </div>

        {/* 🔹 CONTENT BLOCK */}
        <div className="w-full max-w-5xl flex flex-col mt-8">

          {/* 🔹 VIDEO */}
          <div className="w-full aspect-video bg-[#1f2937] rounded-xl mb-6 shadow-lg border border-gray-800 overflow-hidden">
            <iframe
              src={current.video}
              title="Workout Video"
              className="w-full h-full"
              allowFullScreen
            />
          </div>

          {/* 🔹 PHASE TABS */}
          <div className="flex gap-6 border-b border-gray-800 pb-2 mb-6">
            {phases.map((p) => (
              <button
                key={p}
                onClick={() => setPhase(p)}
                className={`pb-2 text-sm transition
                  ${
                    phase === p
                      ? "text-[#4ade80] border-b-2 border-[#4ade80] font-semibold"
                      : "text-gray-400 hover:text-white"
                  }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* 🔹 TEXT */}
          <h2 className="text-2xl font-bold text-white mb-2">
            {phase}
          </h2>

          <p className="text-gray-400 mb-8">
            {current.desc}
          </p>

          {/* 🔹 BUTTON */}
          <button className="w-64 bg-[#4ade80] text-black font-bold py-3 rounded-lg hover:bg-green-400 transition-colors">
            Mark Phase as Complete
          </button>

        </div>
      </div>
    </div>
  );
}