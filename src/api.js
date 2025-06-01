import axios from "axios";

const API_URL = "/games";

const getGames = () => axios.get(API_URL);
const addGame = (game) => axios.post(API_URL, game);
const deleteGame = (id) => axios.delete(`${API_URL}/${id}`);

export { getGames, addGame, deleteGame};