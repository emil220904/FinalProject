import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthContext";

const API_KEY = "c49d21c946b545d5b6538aa9ec1046ed";

export default function BrowseGames() {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameDetails, setGameDetails] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const formatDate = (isoDate) => {
  if (!isoDate) return "";
  const [year, month, day] = isoDate.split("-");
  return `${day}.${month}.${year}`;
  }

  useEffect(() => {
    const fetchPopularGames = async () => {
      try {
        const res = await axios.get(
          `https://api.rawg.io/api/games?key=${API_KEY}&page_size=50`
        );
        setGames(res.data.results);
      } catch (err) {
        console.error("Грешка при зареждане на игри:", err);
      }
    };

    fetchPopularGames();
  }, []);

  const fetchGameDetails = async (id) => {
    try {
      const res = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
      );
      setGameDetails(res.data);
    } catch (err) {
      console.error("Грешка при зареждане на детайли:", err);
    } finally {
    }
  };

  const handleGameClick = async (game) => {
    setSelectedGame(game);
    await fetchGameDetails(game.id);
  };

  const handleAddGame = () => {
    if (!user)
    {
      alert("Трябва да се логнете за да добавите игра!");
      return;
    }
    navigate("/add", { state: { game: selectedGame } });
  };

  const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<i key={i} className="fas fa-star" style={{ color: "#f5c518" }}></i>);
  }

  if (hasHalfStar) {
    stars.push(<i key="half" className="fas fa-star-half-alt" style={{ color: "#f5c518" }}></i>);
  }

  while (stars.length < 5) {
    stars.push(<i key={`empty-${stars.length}`} className="far fa-star" style={{ color: "#ccc" }}></i>);
  }

  return stars;
};

  const closeDetails = () => {
    setSelectedGame(null);
    setGameDetails(null);
  };

  return (
    <main className="browse-games">
      <h2>Разгледай популярни игри</h2>
      
      <div className="game-grid">
        {games.map((game) => (
          <div
            className="game-card"
            key={game.id}
            onClick={() => handleGameClick(game)}
          >
            <div className="game-card-image">
              {game.background_image ? (
                <img src={game.background_image} alt={game.name} />
              ) : (
                <div className="no-image">Няма изображение</div>
              )}
            </div>
            <div className="game-card-info">
              <h3>{game.name}</h3>
              <div className="game-meta">
                <span>
                  <i className="fas fa-calendar-alt"></i> {formatDate(game.released) || "Няма дата"}
                </span>
                <span>{renderStars(game.rating || 0)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedGame && (
        <div className={`game-details-modal ${gameDetails ? "show" : ""}`}>
          <div className="game-details-content">
            <button className="close-btn" onClick={closeDetails}>
              <i class="fas fa-xmark"></i>
            </button>            
              <>
                <div className="game-header">
                  <div className="game-cover">
                    {gameDetails?.background_image ? (
                      <img 
                        src={gameDetails.background_image} 
                        alt={gameDetails.name} 
                      />
                    ) : (
                      <div className="no-image">Няма изображение</div>
                    )}
                  </div>
                  
                  <div className="game-header-info">
                    <h1>{gameDetails?.name}</h1>
                    
                    <div className="game-stats">
                      <div className="stat">
                        <i className="fas fa-calendar-alt"></i>
                        <span>{formatDate(gameDetails?.released) || "Неизвестна дата"}</span>
                      </div>
                      
                      {gameDetails?.metacritic && (
                        <div className="stat">
                          <i className="fas fa-award"></i>
                          <span className="metacritic-score">
                            {gameDetails.metacritic}
                          </span>
                        </div>
                      )}
                      
                      <div className="stat">
                      <span>{renderStars(gameDetails?.rating || 0)}</span>
                      </div>
                    </div>
                    
                    <button className="add-game-btn" onClick={handleAddGame}>
                      <i className="fas fa-plus"></i> Добави в моята колекция
                    </button>
                  </div>
                </div>
                
                <div className="game-body">
                  <div className="game-section">
                    <h3>Описание</h3>
                    <p className="game-description">
                      {gameDetails?.description_raw || "Няма налично описание."}
                    </p>
                  </div>
                  
                  <div className="game-section">
                    <h3>Жанрове</h3>
                    <div className="game-tags">
                      {gameDetails?.genres?.map((genre) => (
                        <span key={genre.id} className="genre-tag">
                          {genre.name}
                        </span>
                      )) || "Няма информация за жанрове"}
                    </div>
                  </div>
                  
                  <div className="game-section">
                    <h3>Платформи</h3>
                    <div className="game-tags">
                      {gameDetails?.platforms?.map((p) => (
                        <span key={p.platform.id} className="platform-tag">
                          {p.platform.name}
                        </span>
                      )) || "Няма информация за платформи"}
                    </div>
                  </div>
                  
                </div>
              </>
            
          </div>
        </div>
      )}
    </main>
  );
}