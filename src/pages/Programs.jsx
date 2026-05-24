import { useNavigate } from "react-router-dom";
import buffImage from "../assets/buff.webp";
import messImage from "../assets/mess.jpg";
import sergioImage from "../assets/sergio.webp";
import tonyImage from "../assets/tony.webp";

const pathways = [
  {
    role: "Attacker",
    title: "Attacker Accelerator",
    description: "Explosive movement, ruthless finishing, weak-foot confidence, and final-third composure under pressure.",
    image: messImage,
    accent: "attacker",
    path: "/workout/Attacker"
  },
  {
    role: "Midfielder",
    title: "Midfield Control Lab",
    description: "Scanning, body orientation, tempo control, and line-breaking decisions shaped for calm technical authority.",
    image: tonyImage,
    accent: "midfielder",
    path: "/workout/Midfielder"
  },
  {
    role: "Defender",
    title: "Defender Command Block",
    description: "Recovery speed, duel timing, leadership energy, and defensive aggression with cleaner decision-making.",
    image: sergioImage,
    accent: "defender",
    path: "/workout/Defender"
  },
  {
    role: "Goalkeeper",
    title: "Goalkeeper Command",
    description: "Reaction sharpness, box presence, footwork, and game-reading focus with commanding penalty-area control.",
    image: buffImage,
    accent: "goalkeeper",
    path: "/workout/GK"
  }
];

function ProgramCard({ pathway, onOpen }) {
  return (
    <article className={`program-card program-card-${pathway.accent}`}>
      <div className="program-card-media">
        <img src={pathway.image} alt={pathway.role} loading="lazy" />
        <div className="program-card-image-glow" />
        <div className="program-card-media-overlay" />
      </div>

      <div className="program-card-content">
        <span>{pathway.role}</span>
        <h2>{pathway.title}</h2>
        <p>{pathway.description}</p>
        <button className="program-card-cta" onClick={() => onOpen(pathway.path)}>
          Open Pathway
        </button>
      </div>
    </article>
  );
}

function Programs() {
  const navigate = useNavigate();

  return (
    <main className="programs-page">
      <section className="programs-hero">
        <div>
          <span className="eyebrow">Elite pathways</span>
          <h1>Position-specific development blocks</h1>
          <p>
            Four role-based pathways, each shaped with a cinematic player presence so the academy feels immersive without losing product clarity.
          </p>
        </div>
      </section>

      <section className="program-grid">
        {pathways.map((pathway) => (
          <ProgramCard key={pathway.role} pathway={pathway} onOpen={navigate} />
        ))}
      </section>
    </main>
  );
}

export default Programs;
