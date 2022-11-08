import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import algorand from "./algorand";
import loaders from "./loaders";
import reach from "./reach";

const reducer = combineReducers({
  algorand,
  loaders,
  reach,
});

const store = configureStore({
  reducer,
});

export default store;

export type AppDispatch = typeof store.dispatch; // Here we export the store's dispatch type
export type RootState = ReturnType<typeof store.getState>; // Here we export the store's state
