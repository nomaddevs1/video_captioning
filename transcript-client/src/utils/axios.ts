import axios from "axios";
import { IS_PRODUCTION } from "./environment";

export const API_URL = IS_PRODUCTION
  ? "https://your-railway-url.railway.app"  // Replace with your actual Railway URL
  : "http://localhost:8000";

export const AxiosPrivateClient = axios.create({
  baseURL: API_URL,
  // headers: {
  //   "Content-Type": "application/json"
  // },
});
