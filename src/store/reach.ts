import { createSlice } from "@reduxjs/toolkit";
import type { AppDispatch } from ".";

// Slice

/* eslint-disable no-param-reassign */
const slice = createSlice({
  name: "reach",
  initialState: {
    reachDisconnectedTime: Date.now(),
  },
  reducers: {
    changeReachDisconnectedTime: (state, action) => {
      state.reachDisconnectedTime = action.payload;
    },
  },
});
/* eslint-enable */

export default slice.reducer;

// Actions

const { changeReachDisconnectedTime } = slice.actions;

export const updateReachDisconnectedTime =
  (time: number) => async (dispatch: AppDispatch) => {
    dispatch(changeReachDisconnectedTime(time));
  };
