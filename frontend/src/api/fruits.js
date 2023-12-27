import axios from "axios";
import { API } from "./consts";

export const fetchFruits = async () => {
  const response = await axios.get(`${API}/fruits`);
  return response.data;
};

export const createFruit = async (fruit) => {
  const response = await axios.post(`${API}/fruits`, fruit);
  return response.data;
};
