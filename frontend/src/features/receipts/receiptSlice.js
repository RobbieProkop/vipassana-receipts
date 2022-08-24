import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import receiptService from "./receiptService";

const initialState = {
  receiptsArr: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const getAll = createAsyncThunk(
  "receipts/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await receiptService.getAll(token);
    } catch (error) {
      const message =
        error.response.data.message || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create new goal
export const createReceipt = createAsyncThunk(
  "receipts/create",
  async (receiptData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await receiptService.createReceipt(receiptData, token);
    } catch (error) {
      const message =
        error.response.data.message || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const receiptSlice = createSlice({
  name: "receipts",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAll.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.receiptsArr = action.payload;
      })
      .addCase(getAll.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.receiptsArr = [];
      })
      .addCase(createReceipt.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createReceipt.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.receiptsArr.push(action.payload);
      })
      .addCase(createReceipt.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = receiptSlice.actions;
export default receiptSlice.reducer;
