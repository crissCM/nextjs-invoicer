import { createSlice } from "@reduxjs/toolkit";
import type { AppDispatch } from ".";

// Slice

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

export default slice.reducer;

// Actions

const { changeReachDisconnectedTime } = slice.actions;

export const updateReachDisconnectedTime =
  (time: number) => async (dispatch: AppDispatch) => {
    dispatch(changeReachDisconnectedTime(time));
  };
