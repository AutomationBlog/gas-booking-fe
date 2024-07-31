import { getUserData } from "./Storage";

export const isAuthenticated = () => {
  return getUserData() !== null ? true : false;
};

export const isAdmin = () => {
  return getUserData().user.name === "admin" ? true : false;
};
