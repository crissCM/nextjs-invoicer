import { createSlice } from "@reduxjs/toolkit";
import type { AppDispatch } from ".";

// Slice

/* eslint-disable no-param-reassign */
const slice = createSlice({
  name: "ui",
  initialState: {
    menuVisible: true,
  },
  reducers: {
    changeMenuVisibility: (state, action) => {
      state.menuVisible = action.payload;
    },
  },
});
/* eslint-enable */

export default slice.reducer;

// Actions

const { changeMenuVisibility } = slice.actions;

export const updateMenuVisibility =
  (visibility: boolean) => async (dispatch: AppDispatch) => {
    dispatch(changeMenuVisibility(visibility));
  };
