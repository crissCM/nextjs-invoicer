import { createSlice } from "@reduxjs/toolkit";
import { disconnect } from "src/reach";
import {
  CHAIN_NETWORK_KEY,
  clearLocalStorageExcept,
  THEME,
  THEME_KEY,
} from "src/utils";
import localStore from "store";
import type { AppDispatch } from ".";
import { updateAddress, updateChainNetwork, updateProvider } from "./algorand";
import { updateTheme } from "./ui";

// Slice

/* eslint-disable no-param-reassign */
const slice = createSlice({
  name: "auth",
  initialState: {
    signInTime: Date.now(),
    signOutTime: Date.now(),
  },
  reducers: {
    signIn: (state, action) => {
      state.signInTime = action.payload;
    },
    signOut: (state, action) => {
      state.signOutTime = action.payload;
    },
  },
});
/* eslint-enable */

export default slice.reducer;

// Actions

const { signIn, signOut } = slice.actions;

export const doSignIn =
  (network: boolean, provider: string, address: string) =>
  async (dispatch: AppDispatch) => {
    dispatch(signIn(Date.now()));
    dispatch(updateChainNetwork(network));
    dispatch(updateProvider(provider));
    dispatch(updateAddress(address));
  };

export const doSignOut = () => async (dispatch: AppDispatch) => {
  clearLocalStorageExcept([THEME_KEY, CHAIN_NETWORK_KEY]);
  await disconnect();
  dispatch(signOut(Date.now()));
  dispatch(updateTheme(localStore.get(THEME_KEY) || THEME.LIGHT));
  dispatch(updateChainNetwork(localStore.get(CHAIN_NETWORK_KEY) ?? false));
};
