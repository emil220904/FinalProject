import axios from "axios";

const API_URL = "/games";

export const getGames = () => axios.get(API_URL);
export const addGame = (game) => axios.post(API_URL, game);
export const deleteGame = (id) => axios.delete(`${API_URL}/${id}`);
export const getGame = (id) => axios.get(`${API_URL}/${id}`);
export const updateGame = (id, game) => axios.put(`${API_URL}/${id}`, game);
