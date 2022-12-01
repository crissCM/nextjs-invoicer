import { createSlice } from "@reduxjs/toolkit";
import type { AppDispatch } from ".";

// Slice

/* eslint-disable no-param-reassign */
const slice = createSlice({
  name: "auth",
  initialState: {
    signOutTime: Date.now(),
  },
  reducers: {
    signOut: (state, action) => {
      state.signOutTime = action.payload;
    },
  },
});
/* eslint-enable */

export default slice.reducer;

// Actions

const { signOut } = slice.actions;

export const doSignOut = (time: number) => async (dispatch: AppDispatch) => {
  dispatch(signOut(time));
};
