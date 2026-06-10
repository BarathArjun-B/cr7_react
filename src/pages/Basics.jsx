import "../App.css";
import { useNavigate } from "react-router-dom";
import ballControlImg from "../assets/ballc.jpg";
import passingImg from "../assets/pass.jpg";
import dribblingImg from "../assets/drib.jpg";
import shootingImg from "../assets/shoot.jpg";

const skills = [
  {
    eyebrow: "Ball Control",
    title: "Ball Control Mastery",
    description:
      "Dominate the ball under pressure. First touch, close control, and body orientation drills that separate elite players from the rest.",
    image: ballControlImg,
    imagePosition: "center 36%",
    accent: "ball-control",
    glowColor: "rgba(34, 197, 94, 0.22)",
    borderColor: "rgba(34, 197, 94, 0.16)",
    borderHoverColor: "rgba(34, 197, 94, 0.32)",
    id: "ball-control",
    path: "/tutorial/ball-control"
  },
  {
    eyebrow: "Passing",
    title: "Precision Passing Lab",
    description:
      "Short, long, through-balls, and driven passes. Build the range and accuracy that keeps your team ahead of the press.",
    image: passingImg,
    imagePosition: "center 30%",
    accent: "passing",
    glowColor: "rgba(45, 212, 191, 0.22)",
    borderColor: "rgba(45, 212, 191, 0.14)",
    borderHoverColor: "rgba(45, 212, 191, 0.30)",
    id: "passing",
    path: "/tutorial/passing"
  },
  {
    eyebrow: "Dribbling",
    title: "Dribbling Command",
    description:
      "Beat defenders with confidence. Speed dribbling, tight-space moves, and directional changes that keep opponents guessing.",
    image: dribblingImg,
    imagePosition: "center 25%",
    accent: "dribbling",
    glowColor: "rgba(251, 146, 60, 0.22)",
    borderColor: "rgba(251, 146, 60, 0.14)",
    borderHoverColor: "rgba(251, 146, 60, 0.30)",
    id: "dribbling",
    path: "/tutorial/dribbling"
  },
  {
    eyebrow: "Shooting",
    title: "Finishing Academy",
    description:
      "Power, placement, composure. Technique-first finishing drills that build the muscle memory to score when it matters most.",
    image: shootingImg,
    imagePosition: "center 18%",
    accent: "shooting",
    glowColor: "rgba(248, 113, 113, 0.22)",
    borderColor: "rgba(248, 113, 113, 0.14)",
    borderHoverColor: "rgba(248, 113, 113, 0.30)",
    id: "shooting",
    path: "/tutorial/shooting"
  }
];

function SkillCard({ skill, onOpen }) {
  return (
    <article
      className="program-card"
      style={{
        borderColor: skill.borderColor,
        "--card-hover-border": skill.borderHoverColor
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = skill.borderHoverColor)}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = skill.borderColor)}
    >
      <div className="program-card-media">
        <img src={skill.image} alt={skill.title} loading="lazy" style={{ objectPosition: skill.imagePosition }} />
        <div
          className="program-card-image-glow"
          style={{ background: `radial-gradient(circle at 50% 18%, ${skill.glowColor}, transparent 45%)` }}
        />
        <div className="program-card-media-overlay" />
      </div>

      <div className="program-card-content">
        <span>{skill.eyebrow}</span>
        <h2>{skill.title}</h2>
        <p>{skill.description}</p>
        <button className="program-card-cta" onClick={() => onOpen(skill.path)} aria-label={`Open ${skill.title} tutorial`}>
          Open Tutorial
        </button>
      </div>
    </article>
  );
}

function Basics() {
  const navigate = useNavigate();

  const openHandler = (path) => {
    // navigate to tutorial or to an anchor; default to tutorial path
    navigate(path);
  };

  return (
    <section className="skills-section">
      <div className="skills-shell">
        <div className="skills-heading">
          <span className="eyebrow">Basics</span>
          <h2>Football Fundamentals</h2>
          <p>Master the core technical skills every elite footballer must develop.</p>
        </div>

        <div className="program-grid skills-grid">
          {skills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} onOpen={openHandler} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Basics;
