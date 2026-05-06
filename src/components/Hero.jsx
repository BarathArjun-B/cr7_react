import Card from "./Card.jsx";
import Button from "./Button.jsx";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();
  const features = [
    {
      title: "⚽ Ball Control",
      desc: "Master the basics of controlling the ball.",
      path: "/tutorial/ball-control"
    },
    {
      title: "🎯 Passing",
      desc: "Learn accurate and powerful passing.",
      path: "/tutorial/passing"
    },
    {
      title: "🔥 Dribbling",
      desc: "Improve your dribbling skills step by step.",
      path: "/tutorial/dribbling"
    },
    {
      title: "🥅 Shooting",
      desc: "Score goals with precision and power.",
      path: "/tutorial/shooting"
    },
  ];

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h2>
            Train Like a Pro.
            <br />
            Start as a Beginner.
          </h2>

          <p>No coach? No problem. I will be there with you.</p>
          <p>"Talent without working hard is nothing,"</p>

          <Button text="Start Training" onClick={() => navigate("/training")} />
        </div>
      </section>

      <section className="features">
        {features.map((item, index) => (
          <Card
            key={index}
            title={item.title}
            desc={item.desc}
            onClick={() => {
              console.log("Feature card clicked:", item.path);
              navigate(item.path);
            }}
          />
        ))}
      </section>
    </>
  );
}

export default Hero;