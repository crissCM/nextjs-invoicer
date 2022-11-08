import { createSlice } from "@reduxjs/toolkit";
import store from "store";
import type { AppDispatch } from ".";
import { CHAIN_NETWORK_KEY, PROVIDER_KEY } from "../utils";

// Slice

/* eslint-disable no-param-reassign */
const slice = createSlice({
  name: "algorand",
  initialState: {
    isMainNet: store.get(CHAIN_NETWORK_KEY) ?? true,
    provider: store.get(PROVIDER_KEY) || "",
  },
  reducers: {
    changeChainNetwork: (state, action) => {
      state.isMainNet = action.payload;
    },
    changeProvider: (state, action) => {
      state.provider = action.payload;
    },
  },
});
/* eslint-enable */

export default slice.reducer;

// Actions

const { changeChainNetwork, changeProvider } = slice.actions;

export const updateChainNetwork =
  (isMainNet: boolean) => async (dispatch: AppDispatch) => {
    store.set(CHAIN_NETWORK_KEY, isMainNet);
    dispatch(changeChainNetwork(isMainNet));
  };

export const updateProvider =
  (provider: boolean) => async (dispatch: AppDispatch) => {
    store.set(PROVIDER_KEY, provider);
    dispatch(changeProvider(provider));
  };
