import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import receiptReducer from "../features/receipts/receiptSlice";
import reportReducer from "../features/report/reportSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    receipts: receiptReducer,
    reports: reportReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
