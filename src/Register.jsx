import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthContext";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validatePassword = (pwd) => {
    const hasLetter = /[a-zA-Z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const minLength = pwd.length >= 7;
    return hasLetter && hasNumber && minLength;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validatePassword(password)) {
    setError("Паролата трябва да съдържа поне една буква, една цифра и да бъде поне 7 символа");
    return;
  }

  try {
    const checkRes = await axios.get(`/users?email=${encodeURIComponent(email)}`);
    
    if (checkRes.data && checkRes.data.length > 0) {
      setError("Потребител с този имейл вече съществува.");
      return;
    }

    const newUser = { 
      email, 
      password
    };
    
    const registerRes = await axios.post("/users", newUser);
    console.log('Успешна регистрация:', registerRes.data);

    const loginResponse = await axios.get(`/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
    
    if (loginResponse.data && loginResponse.data.length > 0) {
      login(loginResponse.data[0]);
      navigate("/");
    } else {
      throw new Error("Влизането след регистрация неуспешно");
    }

  } catch (err) {
    console.error("Грешка при регистрация:", err);
    setError(
      err.response?.data?.message || 
      err.message || 
      "Грешка в мрежовата връзка. Проверете интернета и опитайте отново."
    );
  }
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