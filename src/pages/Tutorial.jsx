import { useParams } from "react-router-dom";
import "../App.css";
import ballControlImg from "../assets/ballc.jpg";
import passingImg from "../assets/pass.jpg";
import dribblingImg from "../assets/drib.jpg";
import shootingImg from "../assets/shoot.jpg";

const tutorialData = {
  "ball-control": {
    title: "Ball Control",
    video: "https://www.youtube.com/embed/qr53U0H3VPs",
    desc: "Learn the basics of ball control and first touch."
  },
  passing: {
    title: "Passing",
    video: "https://www.youtube.com/embed/oIpRuzvsU80",
    desc: "Improve accuracy and power in your passing."
  },
  dribbling: {
    title: "Dribbling",
    video: "https://www.youtube.com/embed/naEccnjzLxM",
    desc: "Master dribbling skills step by step."
  },
  shooting: {
    title: "Shooting",
    video: "https://www.youtube.com/embed/Pjej_jadea8",
    desc: "Learn how to score with precision and power."
  }
};

const bgImages = {
  "ball-control": ballControlImg,
  passing: passingImg,
  dribbling: dribblingImg,
  shooting: shootingImg
};

export default function Tutorial() {
  const { type } = useParams();
  console.log(type);
  const data = tutorialData[type];

  if (!data) {
    return <div style={{ color: "white", padding: "100px" }}>Tutorial not found for: {type}</div>;
  }

  return (
    <div
      className="tutorial-page"
      style={{
        backgroundImage: `url(${bgImages[type]})`
      }}
    >
      <div className="tutorial-container">

        <h1>{data.title}</h1>

        <div className="video-box">
          <iframe
            src={data.video}
            title={data.title}
            allowFullScreen
          ></iframe>
        </div>

        <p>{data.desc}</p>

      </div>
    </div>
  );
}
