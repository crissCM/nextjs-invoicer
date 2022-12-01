import { createSlice } from "@reduxjs/toolkit";
import store from "store";
import type { AppDispatch } from ".";
import { ADDRESS_KEY, CHAIN_NETWORK_KEY, PROVIDER_KEY } from "../utils";

// Slice

/* eslint-disable no-param-reassign */
const slice = createSlice({
  name: "algorand",
  initialState: {
    isMainNet: store.get(CHAIN_NETWORK_KEY) ?? true,
    provider: store.get(PROVIDER_KEY) || "",
    address: store.get(ADDRESS_KEY) || "",
  },
  reducers: {
    changeChainNetwork: (state, action) => {
      state.isMainNet = action.payload;
    },
    changeProvider: (state, action) => {
      state.provider = action.payload;
    },
    changeAddress: (state, action) => {
      state.address = action.payload;
    },
  },
});
/* eslint-enable */

export default slice.reducer;

// Actions

const { changeChainNetwork, changeProvider, changeAddress } = slice.actions;

export const updateChainNetwork =
  (isMainNet: boolean) => async (dispatch: AppDispatch) => {
    store.set(CHAIN_NETWORK_KEY, isMainNet);
    dispatch(changeChainNetwork(isMainNet));
  };

export const updateProvider =
  (provider: string) => async (dispatch: AppDispatch) => {
    store.set(PROVIDER_KEY, provider);
    dispatch(changeProvider(provider));
  };

export const updateAddress =
  (address: string) => async (dispatch: AppDispatch) => {
    store.set(ADDRESS_KEY, address);
    dispatch(changeAddress(address));
  };
