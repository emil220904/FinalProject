// src/pages/EditGame.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getGame, updateGame } from "./api";

export default function EditGame() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getGame(id).then((res) => setGame(res.data));
  }, [id]);

  const handleChange = (e) => {
    setGame({ ...game, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateGame(id, game);
    navigate("/");
  };

  if (!game) return <p>Зареждане...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Редактирай игра</h2>
      <input name="title" value={game.title} onChange={handleChange} required />
      <input name="genre" value={game.genre} onChange={handleChange} required />
      <input name="platform" value={game.platform} onChange={handleChange} required />
      <input name="date" type="date" value={game.date} onChange={handleChange} required />
      <input name="rating" type="number" value={game.rating} onChange={handleChange} required />
      <textarea name="comment" value={game.comment} onChange={handleChange} />
      <button type="submit">Запази</button>
    </form>
  );
}
