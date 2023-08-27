import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reportService from "./reportService";
import { RootState } from "../../app/store";
import { ReceiptState, ReceiptType, ReportState, ReportType } from "../states";
import { toast } from "react-toastify";

const initialState: ReportState = {
  reportReceiptsArr: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// Create new receipt
export const genReport = createAsyncThunk<
  //  CHeck this return type!!
  ReceiptType[], //Return type
  ReportType, // Thunk Argument
  { rejectValue: string; state: RootState }
>("report/create", async (reportDates, thunkAPI) => {
  // ThunkAPIConfig
  try {
    const token = thunkAPI.getState().auth.user?.token;
    if (!token) {
      return thunkAPI.rejectWithValue("token not valid");
    }
    return await reportService.genReport(reportDates, token);
  } catch (error: any) {
    const message =
      error.response.data.message || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const reportSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    reset: (state) => {
      state.reportReceiptsArr = [];
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder

      //Create
      .addCase(genReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(genReport.fulfilled, (state, action) => {
        state.isLoading = false;

        state.isSuccess = true;
        state.isError = false;
        state.message = "";
        state.reportReceiptsArr = action.payload;
      })
      .addCase(genReport.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message =
          action.payload ??
          "An error occurred in the Receipt Slice create receipt";
      });
  },
});

export const { reset } = reportSlice.actions;
export default reportSlice.reducer;
