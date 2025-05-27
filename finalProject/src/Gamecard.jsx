import { Link } from "react-router-dom";

export default function GameCard({ game, onDelete }) {
  const getStars = (rating) => {
    const fullStars = Math.round((rating / 10) * 5);
    return "★".repeat(fullStars) + "☆".repeat(5 - fullStars);
  };

  return (
    <div className="game-card">
      {game.image && <img src={game.image} alt={game.title} className="game-image" />}
      <h3>{game.title}</h3>
      <p>Жанр: {game.genre}</p>
      <p>Платформа: {game.platform}</p>
      <p>Дата: {game.date}</p>
      <p>Оценка: {game.rating}/10</p>
      <p className="stars">{getStars(game.rating)}</p>
      <p>Коментар: {game.comment}</p>
      <Link to={`/edit/${game.id}`}>Редактирай</Link>
      <button onClick={() => onDelete(game.id)}>Изтрий</button>
    </div>
  );
}
