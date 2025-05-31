
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { addGame } from "./api";
import { useAuth } from "./AuthContext";
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
  const location = useLocation();

  const API_KEY = "c49d21c946b545d5b6538aa9ec1046ed";

  
  useEffect(() => {
    const selected = location.state?.game;
    if (selected) {
      setGame((prev) => ({
        ...prev,
        title: selected.name || "",
        genre: selected.genres?.map((g) => g.name).join(", ") || "",
        platform: selected.platforms?.map((p) => p.platform.name).join(", ") || "",
        image: selected.background_image || "",
      }));
    }
  }, [location.state]);

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



const { user } = useAuth(); 

const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!user?.id) {
    alert("Трябва да сте влезли в системата, за да добавяте игри! ");
    return;
  }

  try {
    const gameToAdd = {
      ...game,
      userId: user.id
    };

    await addGame(gameToAdd);
    alert("Играта е добавена успешно!");
    
    setGame({ 
      title: "",
      genre: "",
      platform: "",
      date: "",
      rating: "",
      comment: "",
      image: "",
      status: ""
    });
    
    navigate("/");
  } catch (err) {
    console.error("Грешка при запис: ", err);
    alert("Възникна грешка при добавянето на играта.");
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
      <input name="genre" value={game.genre} readOnly />

      <label>Платформа</label>
      <input name="platform" value={game.platform} readOnly />

      <label>Статус на играта</label>
      <select name="status" value={game.status} onChange={handleChange} required>
        <option value="" disabled hidden>
          -- Избери статус --
        </option>
        <option value="playing">Играе се в момента</option>
        <option value="played">Изиграна</option>
        <option value="wishlist">Предстои да се играе</option>
      </select>

      <label>Дата на изиграване</label>
      <input type="date" name="date" value={game.date} onChange={handleChange} required />

      <label>Оценка</label>
      <div className="stars">
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
