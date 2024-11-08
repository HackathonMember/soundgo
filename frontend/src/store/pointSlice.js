import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  points: [],
};

export const pointSlice = createSlice({
  name: "point",
  initialState,
  reducers: {
    addPoint: (state, action) => {
      const point = action.payload;
      state.points.push(point);
    },
  },
});

export const { addPoint } = pointSlice.actions;

export default pointSlice.reducer;
