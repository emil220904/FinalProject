import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(credentials);
    if (success) {
      navigate("/");
    } else {
      alert("Невалиден имейл или парола.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Вход</h2>
      <input type="email" name="email" value={credentials.email} onChange={handleChange} placeholder="Имейл" required />
      <input type="password" name="password" value={credentials.password} onChange={handleChange} placeholder="Парола" required />
      <button type="submit">Влез</button>
      <p style={{ marginTop: "1rem" }}>
        Нямаш профил? <Link to="/register">Регистрация</Link>
      </p>
    </form>
  );
}
