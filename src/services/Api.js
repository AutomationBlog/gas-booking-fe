import axios from "axios";
import { getUserData } from "./Storage";

axios.defaults.baseURL = import.meta.env.VITE_CLOUDE_URL;
if (import.meta.env.VITE_isLOCAL === "true") {
  axios.defaults.baseURL = import.meta.env.VITE_LOCAL_URL;
}

export const handledAPIPost = async (url, data) => {
  return await axios.post(url, data);
};

export const handledAPIGet = async (url) => {
  return await axios.get(url);
};

export const UserDetailsApi = async (url) => {
  let data = { idToken: getUserData().token };
  console.log(data);

  return await axios.post(url, data);
};
