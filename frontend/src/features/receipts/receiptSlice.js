import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import receiptService from "./receiptService";

const initialState = {
  receiptsArr: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

//Get all receipts
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

//Get individual receipt
export const getOneReceipt = createAsyncThunk(
  "receipts/getOne",
  async (receiptsId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await receiptService.getOneReceipt(receiptsId, token);
    } catch (error) {
      const message =
        error.response.data.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create new receipt
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

// Edit a receipt
export const editReceipt = createAsyncThunk(
  "receipts/edit",
  async (receiptData, thunkAPI) => {
    const { id } = receiptData;
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await receiptService.editReceipt(id, receiptData, token);
    } catch (error) {
      const message =
        error.response.data.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// delete user Receipt
export const deleteReceipt = createAsyncThunk(
  "receipts/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await receiptService.deleteReceipt(id, token);
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
      //Get All
      .addCase(getAll.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "";
        state.receiptsArr = action.payload;
      })
      .addCase(getAll.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.receiptsArr = [];
      })
      //Get One
      .addCase(getOneReceipt.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOneReceipt.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.receiptsArr = action.payload;
      })
      .addCase(getOneReceipt.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.receiptsArr = [];
      })
      //Create
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
      })
      .addCase(editReceipt.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editReceipt.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (!action.payload?._id) {
          console.log("action payload", action.payload);
          return console.log("could not update post");
        }
        const { _id } = action.payload;
        const receipts = state.receiptsArr.filter(
          (receipt) => receipt._id !== _id
        );
        state.receiptsArr = [...receipts, action.payload];
      })
      .addCase(editReceipt.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //Delete
      .addCase(deleteReceipt.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteReceipt.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.receiptsArr = state.receiptsArr.filter(
          (receipt) => receipt._id !== action.payload.id
        );
      })
      .addCase(deleteReceipt.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = receiptSlice.actions;
export default receiptSlice.reducer;
