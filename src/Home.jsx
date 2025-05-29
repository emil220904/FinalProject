import { useEffect, useState } from "react";
import { getGames, deleteGame } from "./api";
import GameCard from "./Gamecard";
import { useAuth } from "./AuthContext";

export default function Home() {
  const [games, setGames] = useState([]);
  const { user } = useAuth();

  const loadGames = async () => {
  try {
    const res = await getGames();
    if (user) {
      const userGames = res.data.filter(game => game.userId === user.id);
      console.log("Филтрирани игри: ", userGames); 
      setGames(userGames);
    }
  } catch (err) {
    console.error("Грешка при зареждане:", err);
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
    if (user) {
      loadGames();
    }
  }, [user]);

  if (!user) {
    return <p style={{ textAlign: "center" }}>Трябва да си логнат, за да виждаш своите игри.</p>;
  }

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
