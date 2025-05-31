export default function GameCard({ game, onDelete }) {
  const getStars = (rating) => {
    const fullStars = Math.round((rating / 10) * 5);
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <i
          key={i}
          className="fas fa-star"
          style={{ color: "#f5c518", marginRight: 2 }}
          aria-hidden="true"
        ></i>
      );
    }

    for (let i = fullStars; i < 5; i++) {
      stars.push(
        <i
          key={i}
          className="far fa-star"
          style={{ color: "#ccc", marginRight: 2 }}
          aria-hidden="true"
        ></i>
      );
    }

    return stars;
  };

  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    const [year, month, day] = isoDate.split("-");
    return `${day}.${month}.${year}`;
  };

  const renderStatus = (status) => {
    switch (status) {
      case "playing":
        return <span className="status playing">🟢 Играе се</span>;
      case "played":
        return <span className="status played">🟡 Изиграна</span>;
      case "completed":
        return <span className="status completed">🔴 Превъртяна</span>;
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
      {game.startDate && <p>Начало: {formatDate(game.startDate)}</p>}
      {game.endDate && <p>Край: {formatDate(game.endDate)}</p>}
      <p className="stars">{getStars(game.rating)}</p>
      <p>Коментар: {game.comment}</p>

      <button onClick={() => onDelete(game.id)}>Изтрий</button>
    </div>
  );
}
