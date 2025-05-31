import { createContext, useState, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

 const login = async ({ email, password }) => {
  try {
    console.log('Опит за влизане с: ', { email, password });
    const res = await axios.get(`/users?email=${email}&password=${password}`);
    console.log('Отговор от сървър:', res.data);
    
    const foundUser = res.data[0];
    
    if (foundUser) {
      console.log('Намерен потребител:', foundUser);
      setUser(foundUser);
      return true;
    }

    console.log('Потребител не е намерен');
    return false;
  } catch (err) {
    console.error("Грешка при влизане:", err);
    return false;
  }
};

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
