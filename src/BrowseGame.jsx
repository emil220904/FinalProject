import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_KEY = "c49d21c946b545d5b6538aa9ec1046ed";

export default function BrowseGames() {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=20`);
        setGames(res.data.results);
      } catch (err) {
        console.error("Грешка при зареждане на игри:", err);
      }
    };

    fetchGames();
  }, []);

  const handleClick = (game) => {
    
    navigate("/add", { state: { game } });
  };

  return (
    <main>
      <h2>Разгледай игри</h2>
      <div className="game-grid">
        {games.map((game) => (
          <div
            className="game-card"
            key={game.id}
            onClick={() => handleClick(game)}
            style={{ cursor: "pointer" }}
          >
            {game.background_image && (
              <img src={game.background_image} alt={game.name} className="game-image" />
            )}
            <h3>{game.name}</h3>
            <p>
              Жанр:{" "}
              {game.genres && game.genres.length > 0
                ? game.genres.map((g) => g.name).join(", ")
                : "Няма информация"}
            </p>
            <p>
              Платформа:{" "}
              {game.platforms && game.platforms.length > 0
                ? game.platforms.map((p) => p.platform.name).join(", ")
                : "Няма информация"}
            </p>
            <p>Дата: {game.released || "Неизвестна"}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
