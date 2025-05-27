import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Login() {
  const [loginInput, setLoginInput] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginInput && password) {
    
      login({ login: loginInput });
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Вход</h2>
      <input
        type="text"
        value={loginInput}
        onChange={(e) => setLoginInput(e.target.value)}
        placeholder="Имейл или потребителско име"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Парола"
        required
      />
      <button type="submit">Влез</button>
    </form>
  );
}
