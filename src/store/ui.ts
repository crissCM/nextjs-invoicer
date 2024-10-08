import { createSlice } from "@reduxjs/toolkit";
import { THEME, THEME_KEY } from "src/utils";
import localStore from "store";
import type { AppDispatch } from ".";

// Slice

/* eslint-disable no-param-reassign */
const slice = createSlice({
  name: "ui",
  initialState: {
    theme: THEME.LIGHT,
    menuVisible: true,
  },
  reducers: {
    changeTheme: (state, action) => {
      state.theme = action.payload;
    },
    changeMenuVisibility: (state, action) => {
      state.menuVisible = action.payload;
    },
  },
});
/* eslint-enable */

export default slice.reducer;

// Actions

const { changeTheme, changeMenuVisibility } = slice.actions;

export const updateMenuVisibility =
  (visibility: boolean) => async (dispatch: AppDispatch) => {
    dispatch(changeMenuVisibility(visibility));
  };

export const updateTheme = (theme: string) => async (dispatch: AppDispatch) => {
  localStore.set(THEME_KEY, theme);
  dispatch(changeTheme(theme));
};
