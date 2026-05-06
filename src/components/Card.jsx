function Card({ title, desc, className = "", onClick }) {
  return (
    <div className={`card ${className}`.trim()} onClick={onClick}>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

export default Card;