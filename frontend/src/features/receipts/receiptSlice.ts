import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import receiptService from "./receiptService";
import { RootState } from "../../app/store";
import { CreateReceiptType, ReceiptState, ReceiptType } from "../states";
import { toast } from "react-toastify";

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
    if (!token) {
      return thunkAPI.rejectWithValue("token not valid");
    }
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
  string, // Thunk Argument
  { rejectValue: string; state: RootState } // ThunkAPIConfig
>("receipts/getOne", async (receiptsId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;
    if (!token) {
      return thunkAPI.rejectWithValue("token not valid");
    }
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
  ReceiptType, //Return type
  CreateReceiptType, // Thunk Argument
  { rejectValue: string; state: RootState }
>("receipts/create", async (receiptData, thunkAPI) => {
  // ThunkAPIConfig
  try {
    const token = thunkAPI.getState().auth.user?.token;
    if (!token) {
      return thunkAPI.rejectWithValue("token not valid");
    }
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
  ReceiptType, //Return type
  CreateReceiptType, // Thunk Argument
  { rejectValue: string; state: RootState } // ThunkAPIConfig
>("receipts/edit", async (receiptData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;
    if (!token) {
      return thunkAPI.rejectWithValue("token not valid");
    }
    return await receiptService.editReceipt(receiptData, token);
  } catch (error: any) {
    const message =
      error.response.data.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// delete user Receipt
export const deleteReceipt = createAsyncThunk<
  // CHEK THIS RETURN TYPE
  any, //Return type
  string, // Thunk Argument
  { rejectValue: string; state: RootState }
>("receipts/delete", async (id, thunkAPI) => {
  // ThunkAPIConfig
  try {
    const token = thunkAPI.getState().auth.user?.token;
    if (!token) {
      return thunkAPI.rejectWithValue("token not valid");
    }
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
        if (action.payload.message) {
          state.isSuccess = false;
          state.isError = true;
          toast.error(action.payload.message);
          return;
        }
        state.isSuccess = true;
        state.isError = false;
        const newArray = [...state.receiptsArr, action.payload];

        state.receiptsArr = newArray;
        toast.success("Receipt Added Successfully");
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

        if (!action.payload._id) {
          console.log("action payload", action.payload);
          toast.success("Could not update receipt");
          return console.log("could not update post");
        }
        if (action.payload.message) {
          state.isSuccess = false;
          state.isError = true;
          toast.error(action.payload.message);
          return;
        }
        state.isSuccess = true;
        state.isError = false;
        const { _id } = action.payload;
        const receipts = state.receiptsArr.filter(
          (receipt) => receipt._id !== _id
        );
        state.receiptsArr = [...receipts, action.payload];
        toast.success("Receipt Edited Successfully");
      })
      .addCase(editReceipt.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message =
          action.payload ??
          "An error occurred in the Receipt Slice edit receipt";
      })
      // //Delete
      .addCase(deleteReceipt.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteReceipt.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.receiptsArr = state.receiptsArr.filter(
          (receipt) => receipt._id !== action.payload.id
        );
        toast.success("Receipt Deleted Successfully");
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