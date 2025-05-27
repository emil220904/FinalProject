import { useState } from "react";
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
  });
  const [suggestions, setSuggestions] = useState([]);

  const API_KEY = "c49d21c946b545d5b6538aa9ec1046ed";

  const fetchSuggestions = async (query) => {
    if (!query) return setSuggestions([]);
    try {
      const res = await axios.get(`https://api.rawg.io/api/games?search=${query}&page_size=5&key=${API_KEY}`);
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

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await addGame(game); 
    alert("Играта е добавена успешно!");
    setGame({ title: "", genre: "", platform: "", date: "", rating: "", comment: "" });
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
      <input name="genre" value={game.genre} onChange={handleChange} />

      <label>Платформа</label>
      <input name="platform" value={game.platform} onChange={handleChange} />

      <label>Дата на изиграване</label>
      <input type="date" name="date" value={game.date} onChange={handleChange} required />

      <label>Оценка</label>
      <input type="number" name="rating" value={game.rating} min="1" max="10" onChange={handleChange} />

      <label>Коментар</label>
      <textarea name="comment" value={game.comment} onChange={handleChange} />

      <button type="submit">Добави</button>
    </form>
  );
}
