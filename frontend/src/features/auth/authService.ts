import axios from "axios";
import { UserType } from "../states";

axios.defaults.baseURL = "https://vipassana-receipts.onrender.com";
const API_URL = "/api/users/";
// "proxy": "https://vipassana-receipts.onrender.com",

//Register User
const register = async (userData: object): Promise<UserType> => {
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
const login = async (userData: object): Promise<UserType> => {
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
