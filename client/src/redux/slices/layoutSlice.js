import { createSlice } from "@reduxjs/toolkit";

const layoutSlice = createSlice({
  name: "layout",
  initialState: {
    visible: true,
  },
  reducers: {
    show: (state) => {
      state.visible = true;
    },
    close: (state) => {
      state.visible = false;
    },
  },
});

export const { show, close } = layoutSlice.actions;
export default layoutSlice.reducer;
