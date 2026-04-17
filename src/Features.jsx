function Features() {
  const features = [
    {
      title: "⚽ Ball Control",
      desc: "Master the basics of controlling the ball."
    },
    {
      title: "🎯 Passing",
      desc: "Learn accurate and powerful passing."
    },
    {
      title: "🔥 Dribbling",
      desc: "Improve your dribbling skills step by step."
    },
    {
      title: "🥅 Shooting",
      desc: "Score goals with precision and power."
    }
  ];

  return (
    <section className="features">
      {features.map((item, index) => (
        <div className="card" key={index}>
          <h3>{item.title}</h3>
          <p>{item.desc}</p>
        </div>
      ))}
    </section>
  );
}

export default Features;