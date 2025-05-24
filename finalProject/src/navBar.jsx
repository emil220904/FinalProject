// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav>
      <Link to="/">MyGameLog</Link>
      {user ? (
        <>
          <Link to="/add">Добави игра</Link>
          <button onClick={logout}>Изход</button>
        </>
      ) : (
        <>
          <Link to="/login">Вход</Link>
          <Link to="/register">Регистрация</Link>
        </>
      )}
    </nav>
  );
}
