import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav>
      <Link to="/">MyGameLog</Link>
      <Link to="/browse">Browse</Link>
      {user ? (
        <>
          <Link to="/add">Добави игра</Link>
          <button onClick={logout}>Изход</button>
        </>
      ) : (
        <Link to="/login">Вход</Link>
      )}
    </nav>
  );
}

export default Navbar;
