import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../Features/Auth/AuthSlice";

export const store = configureStore({
  reducer: {
    auth: AuthReducer, // ✅ Fixed syntax: Wrapped inside an object
  },
});
