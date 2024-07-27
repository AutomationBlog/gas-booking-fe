import axios from "axios";
import { getUserData } from "./Storage";

axios.defaults.baseURL = "http://localhost:3000";
// const REGISTER_URL = "/api/auth/register";

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
