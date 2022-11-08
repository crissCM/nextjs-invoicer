import { createSlice } from "@reduxjs/toolkit";
import type { AppDispatch } from ".";

// Slice

/* eslint-disable no-param-reassign */
const slice = createSlice({
  name: "loaders",
  initialState: {
    siteLoaderVisible: false,
  },
  reducers: {
    changeSiteLoader: (state, action) => {
      state.siteLoaderVisible = action.payload;
    },
  },
});
/* eslint-enable */

export default slice.reducer;

// Actions

const { changeSiteLoader } = slice.actions;

export const updateSiteLoader =
  (visibility: boolean) => async (dispatch: AppDispatch) => {
    dispatch(changeSiteLoader(visibility));
  };
