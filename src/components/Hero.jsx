import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import buffImage from "../assets/buff.webp";
import dashboardImage from "../assets/hero.png";
import heroBackdrop from "../assets/cr.jpeg";
import messImage from "../assets/mess.jpg";
import sergioImage from "../assets/sergio.webp";
import tonyImage from "../assets/tony.webp";

const featureCards = [
  {
    eyebrow: "Elite Training Programs",
    title: "Immersive football sessions built with match-speed intent.",
    text: "Technical sharpness, acceleration, finishing, recovery, and weekly progression built into one academy system."
  },
  {
    eyebrow: "Player Analytics",
    title: "Read your growth like a premium sports-tech dashboard.",
    text: "XP trajectory, session intensity, positional focus, and consistency trends surfaced in one command center."
  },
  {
    eyebrow: "AI Football Coach",
    title: "Ask for drills, recovery, and tactical clarity in seconds.",
    text: "The coach layer turns your questions into football-specific action plans instead of generic fitness advice."
  },
  {
    eyebrow: "Community Experience",
    title: "Train with a system that feels bigger than solo reps.",
    text: "Structured milestones, academy standards, and player journeys create a high-performance rhythm."
  }
];

const positions = [
  {
    title: "Attacker",
    image: messImage,
    copy: "Explosive first steps, ruthless finishing, and movement that creates separation.",
    accent: "attacker",
    path: "/workout/Attacker"
  },
  {
    title: "Midfielder",
    image: tonyImage,
    copy: "Scanning, tempo control, body shape, and composure under pressure.",
    accent: "midfielder",
    path: "/workout/Midfielder"
  },
  {
    title: "Defender",
    image: sergioImage,
    copy: "Recovery speed, duels, clearances, and calm decisions in chaos.",
    accent: "defender",
    path: "/workout/Defender"
  },
  {
    title: "Goalkeeper",
    image: buffImage,
    copy: "Footwork, set shape, reaction work, and elite command of the box.",
    accent: "goalkeeper",
    path: "/workout/GK"
  }
];

const testimonials = [
  {
    quote: "The platform feels like a premium performance lab, not a generic workout app.",
    author: "Academy Winger"
  },
  {
    quote: "I can see what I trained, why it mattered, and what to sharpen next without hunting through clutter.",
    author: "Box-to-Box Midfielder"
  },
  {
    quote: "The AI coach gives football answers that actually sound like a coach who watches the game.",
    author: "Youth Goalkeeper"
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 }
};

const MotionArticle = motion.article;
const MotionDiv = motion.div;
const MotionSpan = motion.span;

function Hero() {
  const navigate = useNavigate();

  return (
    <main className="landing-page">
      <section
        className="cinematic-hero"
        style={{ "--hero-image": `url(${heroBackdrop})` }}
      >
        <div className="hero-noise" />
        <div className="hero-gradient" />

        <div className="landing-shell hero-shell">
          <MotionDiv
            className="hero-copy"
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.12, delayChildren: 0.12 }}
          >
            <MotionSpan className="hero-badge" variants={fadeUp} transition={{ duration: 0.7, ease: "easeOut" }}>
              Elite Football Academy Platform
            </MotionSpan>

            <motion.h1 variants={fadeUp} transition={{ duration: 0.8, ease: "easeOut" }}>
              Train With The Mentality Of The World&apos;s Best Players
            </motion.h1>

            <motion.p variants={fadeUp} transition={{ duration: 0.8, ease: "easeOut" }}>
              Build speed, control, tactical intelligence, and elite composure through immersive football training.
            </motion.p>

            <MotionDiv className="hero-actions" variants={fadeUp} transition={{ duration: 0.8, ease: "easeOut" }}>
              <button className="primary-cta" onClick={() => navigate("/training")}>
                Start Training
              </button>
              <button className="secondary-cta" onClick={() => navigate("/programs")}>
                Explore Programs
              </button>
            </MotionDiv>

            <MotionDiv className="hero-metrics" variants={fadeUp} transition={{ duration: 0.8, ease: "easeOut" }}>
              <div>
                <strong>12K+</strong>
                <span>guided training sessions</span>
              </div>
              <div>
                <strong>4 roles</strong>
                <span>position-specific pathways</span>
              </div>
              <div>
                <strong>AI coach</strong>
                <span>football-first feedback loop</span>
              </div>
            </MotionDiv>
          </MotionDiv>

          <MotionDiv
            className="hero-preview"
            initial={{ opacity: 0, y: 36, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.18 }}
          >
            <div className="hero-preview-frame">
              <div className="hero-preview-head">
                <span>LA MASIA ELITE</span>
                <small>Player command center</small>
              </div>

              <div className="hero-preview-grid">
                <div className="preview-stat">
                  <strong>+18%</strong>
                  <span>finishing volume</span>
                </div>
                <div className="preview-stat">
                  <strong>7 day</strong>
                  <span>academy streak</span>
                </div>
                <div className="preview-chart">
                  <i style={{ height: "42%" }} />
                  <i style={{ height: "58%" }} />
                  <i style={{ height: "70%" }} />
                  <i style={{ height: "54%" }} />
                  <i style={{ height: "84%" }} />
                  <i style={{ height: "66%" }} />
                </div>
                <div className="preview-session">
                  <span>Tonight&apos;s block</span>
                  <strong>Attacker / Finishing / 22 min</strong>
                  <p>Pressure finishing under fatigue with weak-foot reps and recovery cooldown.</p>
                </div>
              </div>
            </div>
          </MotionDiv>
        </div>
      </section>

      <section className="landing-section">
        <div className="landing-shell">
          <div className="section-heading">
            <span>Premium Football Product</span>
            <h2>Built like a sports-tech startup, not a generic training page.</h2>
            <p>
              Every section is tuned for clarity, depth, and cinematic restraint so the product feels focused from the first scroll.
            </p>
          </div>

          <div className="feature-grid">
            {featureCards.map((card, index) => (
              <MotionArticle
                key={card.title}
                className="feature-card"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, ease: "easeOut", delay: index * 0.06 }}
              >
                <span>{card.eyebrow}</span>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </MotionArticle>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-section positions-section">
        <div className="landing-shell">
          <div className="section-heading">
            <span>Position-Based Training</span>
            <h2>Choose the game demands you want to sharpen next.</h2>
            <p>
              Compact cards, stronger imagery, and cleaner CTA hierarchy make the academy pathways feel purposeful instead of decorative.
            </p>
          </div>

          <div className="positions-grid">
            {positions.map((position, index) => (
              <MotionArticle
                key={position.title}
                className={`position-card position-card-${position.accent}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, ease: "easeOut", delay: index * 0.05 }}
              >
                <div className="position-card-media">
                  <img src={position.image} alt={position.title} />
                  <div className="position-card-image-glow" />
                  <div className="position-card-media-overlay" />
                </div>
                <div className="position-card-content">
                  <span>{position.title}</span>
                  <h3>{position.title}</h3>
                  <p>{position.copy}</p>
                  <button className="position-card-cta" onClick={() => navigate(position.path)}>
                    Open Pathway
                  </button>
                </div>
              </MotionArticle>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-section dashboard-preview-section">
        <div className="landing-shell dashboard-preview-shell">
          <div className="section-heading dashboard-copy">
            <span>Dashboard Preview</span>
            <h2>See player progress the way modern SaaS products surface performance.</h2>
            <p>
              XP progress, session history, streaks, and training load all live in a restrained dark UI that feels analytical rather than noisy.
            </p>
          </div>

          <MotionDiv
            className="dashboard-preview-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="dashboard-top-row">
              <div className="dashboard-pill">Level 4 / 82% to next milestone</div>
              <div className="dashboard-pill">Weekly Streak: 7 days</div>
            </div>

            <div className="dashboard-main-grid">
              <div className="dashboard-chart-card">
                <span>XP Progress</span>
                <div className="dashboard-chart-bars">
                  <i style={{ height: "32%" }} />
                  <i style={{ height: "46%" }} />
                  <i style={{ height: "58%" }} />
                  <i style={{ height: "72%" }} />
                  <i style={{ height: "66%" }} />
                  <i style={{ height: "88%" }} />
                </div>
              </div>

              <div className="dashboard-stats-column">
                <div className="dashboard-mini-card">
                  <strong>18</strong>
                  <span>completed sessions</span>
                </div>
                <div className="dashboard-mini-card">
                  <strong>420</strong>
                  <span>minutes trained</span>
                </div>
                <div className="dashboard-mini-card">
                  <strong>Attacker</strong>
                  <span>current specialization</span>
                </div>
              </div>

              <div className="dashboard-image-card">
                <img src={dashboardImage} alt="Dashboard preview" />
              </div>
            </div>
          </MotionDiv>
        </div>
      </section>

      <section className="landing-section testimonials-section">
        <div className="landing-shell">
          <div className="section-heading">
            <span>Player Journey</span>
            <h2>Structured enough for recruiters to notice, calm enough for players to keep using.</h2>
            <p>
              The experience is designed to feel premium on first impression and dependable after weeks of real use.
            </p>
          </div>

          <div className="testimonial-grid">
            {testimonials.map((item, index) => (
              <MotionArticle
                key={item.author}
                className="testimonial-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, ease: "easeOut", delay: index * 0.06 }}
              >
                <p>&ldquo;{item.quote}&rdquo;</p>
                <span>{item.author}</span>
              </MotionArticle>
            ))}
          </div>

          <footer className="landing-footer">
            <div>
              <strong>LA MASIA ELITE</strong>
              <p>Immersive football training, analytics, and AI coaching in one premium academy platform.</p>
            </div>
            <div className="landing-footer-links">
              <button onClick={() => navigate("/")}>Home</button>
              <button onClick={() => navigate("/training")}>Training</button>
              <button onClick={() => navigate("/programs")}>Programs</button>
              <button onClick={() => navigate("/dashboard")}>Dashboard</button>
            </div>
          </footer>
        </div>
      </section>
    </main>
  );
}

export default Hero;
