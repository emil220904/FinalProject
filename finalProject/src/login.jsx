import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Симулиран вход
    if (email && password) {
      login({ email });
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Вход</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Имейл" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Парола" required />
      <button type="submit">Влез</button>
    </form>
  );
}
