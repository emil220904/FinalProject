import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import AddGame from "./AddGame";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "./AuthContext";
import BrowseGames from "./BrowseGame";
import axios from "axios";
import "./App.css" ;
import '@fortawesome/fontawesome-free/css/all.min.css';

axios.defaults.baseURL = "http://localhost:5000"; 
axios.defaults.headers.post["Content-Type"] = "application/json";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/browse" element={<BrowseGames />} />
          <Route path="/add" element=
          {
              <PrivateRoute>
                <AddGame />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
