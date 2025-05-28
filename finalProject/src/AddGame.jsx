import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addGame } from "./api";
import axios from "axios";

export default function AddGame() {
  const [game, setGame] = useState({
    title: "",
    genre: "",
    platform: "",
    date: "",
    rating: "",
    comment: "",
    image: "",
    status: "",
  });
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const API_KEY = "c49d21c946b545d5b6538aa9ec1046ed";

  const fetchSuggestions = async (query) => {
    if (!query) return setSuggestions([]);
    try {
      const res = await axios.get(
        `https://api.rawg.io/api/games?search=${query}&page_size=5&key=${API_KEY}`
      );
      setSuggestions(res.data.results);
    } catch (err) {
      console.error("RAWG API error:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGame((prev) => ({ ...prev, [name]: value }));
    if (name === "title") fetchSuggestions(value);
  };

  const handleSelect = (selectedGame) => {
    setGame({
      ...game,
      title: selectedGame.name,
      genre: selectedGame.genres?.map((g) => g.name).join(", ") || "",
      platform: selectedGame.platforms?.map((p) => p.platform.name).join(", ") || "",
      image: selectedGame.background_image || "",
    });
    setSuggestions([]);
  };

  const handleRatingClick = (value) => {
    setGame((prev) => ({ ...prev, rating: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await addGame(game); 
    alert("Играта е добавена успешно!");
    setGame({ title: "", genre: "", platform: "", date: "", rating: "", comment: "" });
    navigate ("/")
  } catch (err) {
    console.error("Грешка при запис:", err);
  }
};


  return (
    <form onSubmit={handleSubmit}>
      <label>Име на игра</label>
      <input
        name="title"
        value={game.title}
        onChange={handleChange}
        placeholder="Търси игра..."
        autoComplete="off"
      />
      {suggestions.length > 0 && (
        <ul className="suggestion-box">
          {suggestions.map((s) => (
            <li key={s.id} onClick={() => handleSelect(s)}>
              {s.name} ({s.released})
            </li>
          ))}
        </ul>
      )}

      <label>Жанр</label>
      <input name="genre" value={game.genre} onChange={handleChange} readOnly/>

      <label>Платформа</label>
      <input name="platform" value={game.platform} readOnly />

        <label>Статус на играта</label>
        <select name="status" value={game.status} onChange={handleChange} required>
        <option value="" disabled hidden>-- Избери статус --</option>
        <option value="playing">Играе се в момента</option>
        <option value="played">Изиграна</option>
        <option value="wishlist">Предстои да се играе</option>
        </select>

      <label>Дата на изиграване</label>
      <input type="date" name="date" value={game.date} onChange={handleChange} required />

      <label>Оценка</label>
      <div className="stars" >
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            style={{ cursor: "pointer", color: n <= Math.round(game.rating / 2) ? "gold" : "#777" }}
            onClick={() => handleRatingClick(n * 2)}
          >
            ★
          </span>
        ))}
      </div>

      <label>Коментар</label>
      <textarea name="comment" value={game.comment} onChange={handleChange} />

      <button type="submit">Добави</button>
    </form>
  );
}
