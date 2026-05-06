import { useNavigate } from "react-router-dom";

function Features() {
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
    }
  ];

  return (
    <section className="features">
      {features.map((item, index) => (
        <div className="card" key={index} onClick={() => navigate(item.path)}>
          <h3>{item.title}</h3>
          <p>{item.desc}</p>
        </div>
      ))}
    </section>
  );
}

export default Features;