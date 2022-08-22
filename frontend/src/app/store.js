import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import receiptReducer from "../features/receipts/receiptSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    receipts: receiptReducer,
  },
});
