import Card from "./Card.jsx";
import Button from "./Button.jsx";

function Hero() {
  const features = [
    {
      title: "⚽ Ball Control",
      desc: "Master the basics of controlling the ball.",
    },
    {
      title: "🎯 Passing",
      desc: "Learn accurate and powerful passing.",
    },
    {
      title: "🔥 Dribbling",
      desc: "Improve your dribbling skills step by step.",
    },
    {
      title: "🥅 Shooting",
      desc: "Score goals with precision and power.",
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

          <Button text="Start Training" />
        </div>
      </section>

      <section className="features">
        {features.map((item, index) => (
          <Card key={index} title={item.title} desc={item.desc} />
        ))}
      </section>
    </>
  );
}

export default Hero;