import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import { UserType, AuthState } from "../states";

//Get user from Local Storage
const storedUser = localStorage.getItem("user");
const user: UserType | null = storedUser ? JSON.parse(storedUser) : null;

const initialState: AuthState = {
  user: user ? user : null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

//Register User
export const register = createAsyncThunk<
  UserType,
  { username: string; email: string; password: string },
  { rejectValue: string }
>("auth/register", async (user, thunkAPI) => {
  try {
    return await authService.register(user);
  } catch (error: any) {
    const message =
      error.response.data.message || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

//login User
export const login = createAsyncThunk<
  UserType,
  { username: string; password: string },
  { rejectValue: string }
>("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error: any) {
    const message =
      error.response.data.message || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    logout: (state) => {
      authService.logout();
      state.user = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload ?? "An error occurred in the Auth Slice";
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.message) {
          state.isError = true;
          state.message = "Invalid Credentials";
          state.user = null;
        } else {
          state.isSuccess = true;
          state.user = action.payload;
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload ?? "An error occurred in the Auth Slice";
        state.user = null;
      });
    // .addCase(logout.pending, (state) => {
    //   state.isLoading = true;
    // })
    // .addCase(logout.fulfilled, (state) => {
    //   state.isLoading = false;
    //   state.isSuccess = true;
    //   state.user = null;
    // })
    // .addCase(logout.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.isError = true;
    //   state.message = action.payload ?? "An error occurred in the Auth Slice";
    //   state.user = null;
    // });
  },
});

export const { reset, logout } = authSlice.actions;

export default authSlice.reducer;
