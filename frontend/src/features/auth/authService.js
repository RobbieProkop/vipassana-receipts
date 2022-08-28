import axios from "axios";

const API_URL = "/api/users/";

//Register User
const register = async (userData) => {
  const { data } = await axios.post(API_URL, userData);

  if (data) {
    localStorage.setItem("user", JSON.stringify(data));
  }

  return data;
};

// Logout

//change this to http only cookie
const logout = () => {
  localStorage.removeItem("user");
};

//Login User
const login = async (userData) => {
  const { data } = await axios.post(API_URL + "login", userData);

  if (data.username) {
    localStorage.setItem("user", JSON.stringify(data));
  }

  return data;
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
