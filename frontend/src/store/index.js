import { configureStore } from "@reduxjs/toolkit";
import pointSlice from "./pointSlice";

export const store = configureStore({
  reducer: {
    point: pointSlice,
  },
});
