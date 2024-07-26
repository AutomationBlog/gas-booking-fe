import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";
const REGISTER_URL = "/register";

export const handledAPIPost = async (data) => {
  return axios.post(REGISTER_URL, data);
};
