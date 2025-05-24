// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email }); // в реално приложение – тук ще има заявка към сървър
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Регистрация</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Имейл" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Парола" required />
      <button type="submit">Регистрирай се</button>
    </form>
  );
}
