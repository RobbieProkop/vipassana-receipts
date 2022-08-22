import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  reducers: {},
  extraReducers: {},
});
