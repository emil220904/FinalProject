import { Link } from "react-router-dom";

export default function GameCard({ game, onDelete }) {
  return (
    <div className="game-card">
      <h3>{game.title}</h3>
      <p>Жанр: {game.genre}</p>
      <p>Платформа: {game.platform}</p>
      <p>Дата: {game.date}</p>
      <p>Оценка: {game.rating}/10</p>
      <p>Коментар: {game.comment}</p>
      <Link to={`/edit/${game.id}`}>Редактирай</Link>
      <button onClick={() => onDelete(game.id)}>Изтрий</button>
    </div>
  );
}
