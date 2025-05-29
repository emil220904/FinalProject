import { useEffect, useState } from "react";
import { getGames, deleteGame } from "./api";
import GameCard from "./Gamecard";

export default function Home() {
  const [games, setGames] = useState([]);

  const loadGames = async () => {
    try {
      const res = await getGames();
      setGames(res.data);
    } catch (err) {
      console.error("Грешка при зареждане на игрите:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteGame(id);
      loadGames();
    } catch (err) {
      console.error("Грешка при изтриване:", err);
    }
  };

  useEffect(() => {
    loadGames();
  }, []);

  return (
    <main>
      <h2 style={{ textAlign: "center" }}>Изиграни игри</h2>
      {games.length === 0 ? (
        <p style={{ textAlign: "center" }}>Няма добавени игри.</p>
      ) : (
        <div className="game-grid">
          {games.map((game) => (
            <GameCard key={game.id} game={game} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </main>
  );
}
