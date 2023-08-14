import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import receiptService from "./receiptService";
import { RootState } from "../../app/store";

export interface ReceiptType {
  _id: string;
  user: string;
  receiptNumber?: number;
  receipt_number?: number;
  place: string;
  full_name?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  address: string;
  postalCode: string;
  type: string;
  number: number;
  words: string;
  signature: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  city: string;
  province: string;
  donor: string;
  country: string;
}

export interface ReceiptState {
  receiptsArr: ReceiptType[] | [];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}

const initialState: ReceiptState = {
  receiptsArr: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

//Get all receipts
export const getAll = createAsyncThunk<
  ReceiptType[], //Return type
  void, // Thunk Argument
  { rejectValue: string; state: RootState } // ThunkAPIConfig
>("receipts/getAll", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;
    return await receiptService.getAll(token);
  } catch (error: any) {
    const message =
      error.response.data.message || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

//Get individual receipt
export const getOneReceipt = createAsyncThunk<
  ReceiptType[], //Return type
  void, // Thunk Argument
  { rejectValue: string; state: RootState } // ThunkAPIConfig
>("receipts/getOne", async (receiptsId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;
    return await receiptService.getOneReceipt(receiptsId, token);
  } catch (error: any) {
    const message =
      error.response.data.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Create new receipt
export const createReceipt = createAsyncThunk<
  //  CHeck this return type!!
  void, //Return type
  ReceiptType, // Thunk Argument
  { rejectValue: string; state: RootState }
>("receipts/create", async (receiptData, thunkAPI) => {
  // ThunkAPIConfig
  try {
    const token = thunkAPI.getState().auth.user?.token;
    return await receiptService.createReceipt(receiptData, token);
  } catch (error: any) {
    const message =
      error.response.data.message || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

// Edit a receipt
export const editReceipt = createAsyncThunk<
  // CHECK THE RETURN TYPE!
  void, //Return type
  ReceiptType, // Thunk Argument
  { rejectValue: string; state: RootState }
>("receipts/edit", async (receiptData, thunkAPI) => {
  // ThunkAPIConfig
  const { id } = receiptData;
  try {
    const token = thunkAPI.getState().auth.user?.token;
    return await receiptService.editReceipt(id, receiptData, token);
  } catch (error: any) {
    const message =
      error.response.data.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// delete user Receipt
export const deleteReceipt = createAsyncThunk<
  void, //Return type
  { id: string }, // Thunk Argument
  { rejectValue: string; state: RootState }
>("receipts/delete", async (id, thunkAPI) => {
  // ThunkAPIConfig
  try {
    const token = thunkAPI.getState().auth.user?.token;
    return await receiptService.deleteReceipt(id, token);
  } catch (error: any) {
    const message =
      error.response.data.message || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

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
        state.message =
          action.payload ??
          "An error occurred in the Receipt Slice get all receipts";
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
        state.message =
          action.payload ??
          "An error occurred in the Receipt Slice get one receipt";
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
        state.message =
          action.payload ??
          "An error occurred in the Receipt Slice create receipt";
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
        state.message =
          action.payload ??
          "An error occurred in the Receipt Slice edit receipt";
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
        state.message =
          action.payload ??
          "An error occurred in the Receipt Slice delete receipt";
      });
  },
});

export const { reset } = receiptSlice.actions;
export default receiptSlice.reducer;
