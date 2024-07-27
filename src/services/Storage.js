export const storeUserData = (data) => {
  localStorage.setItem("userData", JSON.stringify(data));
};

export const getUserData = () => {
  return JSON.parse(localStorage.getItem("userData"));
};
