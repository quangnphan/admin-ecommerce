import { configureStore } from "@reduxjs/toolkit";
import layoutSlice from "./slices/layoutSlice";

export const store = configureStore({
  reducer: {
    layout: layoutSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});
