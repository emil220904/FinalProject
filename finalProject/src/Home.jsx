import { useEffect, useState } from "react";  
import { getGames, deleteGame } from "./api";
import GameCard from "./Gamecard";

export default function Home() {
  const [games, setGames] = useState([]);

  const loadGames = async () => {
  const res = await getGames();
  console.log("API резултат:", res.data);
  setGames(res.data);
};


  const handleDelete = async (id) => {
    await deleteGame(id);
    loadGames();
  };

  useEffect(() => {
    loadGames();
  }, []);

  return (
    <>
      <h2>Изиграни игри</h2>
      {games.length === 0 ? (
        <p>Няма добавени игри.</p>
      ) : (
        <div className="game-grid">
      {games.map((game) => (
        <GameCard key={game.id} game={game} onDelete={handleDelete} />
      ))}
    </div>
      )}
    </>
  );
}
