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
    startDate: "",
    endDate: ""
  });

  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);

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
        `https://api.rawg.io/api/games?search=${query}&page_size=15&key=${API_KEY}`
      );
      setSuggestions(res.data.results);
    } catch (err) {
      console.error("RAWG API error:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGame((prev) => ({ ...prev, [name]: value }));

    if (name === "title") {
      fetchSuggestions(value);
    }

    if (name === "status") {
      const shouldShow = ["played", "completed"].includes(value);
      setShowStartDate(shouldShow);
      setShowEndDate(shouldShow);

      setGame((prev) => ({
        ...prev,
        startDate: shouldShow ? prev.startDate : "",
        endDate: shouldShow ? prev.endDate : "",
      }));
    }
  };

  const handleSelect = (selectedGame) => {
    setGame((prev) => ({
      ...prev,
      title: selectedGame.name,
      genre: selectedGame.genres?.map((g) => g.name).join(", ") || "",
      platform: selectedGame.platforms?.map((p) => p.platform.name).join(", ") || "",
      image: selectedGame.background_image || "",
    }));
    setSuggestions([]);
  };

  const handleRatingClick = (value) => {
    setGame((prev) => ({ ...prev, rating: value }));
  };

  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        status: "",
        startDate: "",
        endDate: ""
      });

      navigate("/");
    } catch (err) {
      console.error("Грешка при запис:", err);
      alert("Възникна грешка при добавянето на играта.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
  <label>Име на игра</label>
  <div className="input-wrapper">
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
  </div>

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
        <option value="completed">Превъртяна</option>
        <option value="wishlist">Предстои да се играе</option>
      </select>

      {showStartDate && (
        <>
          <label>Начална дата</label>
          <input
            type="date"
            name="startDate"
            value={game.startDate}
            onChange={handleChange}
            required
          />
        </>
      )}

      {showEndDate && (
        <>
          <label>Крайна дата (завършване)</label>
          <input
            type="date"
            name="endDate"
            value={game.endDate}
            onChange={handleChange}
            required={game.status === "completed"}
            min={game.startDate}
          />
        </>
      )}

     <label>Оценка</label>
<div className="stars" style={{ fontSize: "20px" }}>
  {[1, 2, 3, 4, 5].map((n) => (
    <i
      key={n}
      className={n <= Math.round(game.rating / 2) ? "fas fa-star" : "far fa-star"}
      style={{
        cursor: "pointer",
        color: n <= Math.round(game.rating / 2) ? "#f5c518" : "#777",
        marginRight: "10px"
      }}
      onClick={() => handleRatingClick(n * 2)}
    />
  ))}
</div>


      <label>Коментар</label>
      <textarea name="comment" value={game.comment} onChange={handleChange} />

      <button type="submit">Добави</button>
    </form>
  );
}
