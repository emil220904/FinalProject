// src/pages/AddGame.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addGame } from "./api";

export default function AddGame() {
  const [game, setGame] = useState({
    title: "",
    genre: "",
    platform: "",
    date: "",
    rating: "",
    comment: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setGame({ ...game, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addGame(game);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Добави игра</h2>
      <input name="title" placeholder="Заглавие" onChange={handleChange} required />
      <input name="genre" placeholder="Жанр" onChange={handleChange} required />
      <input name="platform" placeholder="Платформа" onChange={handleChange} required />
      <input name="date" type="date" onChange={handleChange} required />
      <input name="rating" type="number" min="1" max="10" placeholder="Оценка" onChange={handleChange} required />
      <textarea name="comment" placeholder="Коментар" onChange={handleChange} />
      <button type="submit">Запиши</button>
    </form>
  );
}
