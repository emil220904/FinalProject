
export default function GameCard({ game, onDelete }) {
  const getStars = (rating) => {
    const fullStars = Math.round((rating / 10) * 5);
    return "★".repeat(fullStars) + "☆".repeat(5 - fullStars);
  };

  const renderStatus = (status) => {
    switch (status) {
      case "playing":
        return <span className="status playing">🟢 Играе се</span>;
      case "played":
        return <span className="status played">🟡 Изиграна</span>;
      case "wishlist":
        return <span className="status wishlist">🔵 Ще се играе</span>;
      default:
        return null;
    }
  };

  return (
    <div className="game-card">
      {game.image && <img src={game.image} alt={game.title} className="game-image" />}
      <h3>{game.title}</h3>
      {renderStatus(game.status)}

      <p>Жанр: {game.genre}</p>
      <p>Платформа: {game.platform}</p>
      <p>Дата: {game.date}</p>
      <p className="stars">{getStars(game.rating)}</p>
      <p>Коментар: {game.comment}</p>

      <button onClick={() => onDelete(game.id)}>Изтрий</button>
    </div>
  );
}
