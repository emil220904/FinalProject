import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

 const validatePassword = (pwd) => {
    const hasLetter = /[a-zA-Z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const onlyLettersAndNumbers = /^[a-zA-Z0-9]+$/.test(pwd);
    const minLength = pwd.length >= 7;
    return hasLetter && hasNumber && onlyLettersAndNumbers && minLength;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      setError("Паролата трябва да съдържа поне една буква, една цифра и да няма специални символи.");
      return;
    }
    setError(null);
    login({ email, username });
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Регистрация</h2>
      
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Имейл"
        required
      />
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Потребителско име"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Парола"
        required
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Регистрирай се</button>
    </form>
  );
}
