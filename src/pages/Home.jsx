import Hero from "../components/Hero.jsx";

function Home() {
  return (
    <>
      <Hero />
    </>
  );
}

export default Home;
<div className="w-full px-6 py-16 bg-[#0b1a2a]">
  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">

    <div className="bg-[#0f2236] p-6 rounded-xl">
      ⚽ <b>Ball Control</b>
      <p className="text-gray-400 mt-2">
        Master the basics of controlling the ball.
      </p>
    </div>

    <div className="bg-[#0f2236] p-6 rounded-xl">
      🎯 <b>Passing</b>
      <p className="text-gray-400 mt-2">
        Learn accurate and powerful passing.
      </p>
    </div>

    <div className="bg-[#0f2236] p-6 rounded-xl">
      🔥 <b>Dribbling</b>
      <p className="text-gray-400 mt-2">
        Improve your dribbling skills step by step.
      </p>
    </div>

    <div className="bg-[#0f2236] p-6 rounded-xl">
      🥅 <b>Shooting</b>
      <p className="text-gray-400 mt-2">
        Score goals with precision and power.
      </p>
    </div>

  </div>
</div>