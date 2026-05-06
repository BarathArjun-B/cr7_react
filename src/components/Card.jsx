function Card({ title, desc, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

export default Card;