import axios from "axios";

export const api = axios.create({
  baseURL: "https://viacep.com.br/ws/",
  timeout: 5000,
});
