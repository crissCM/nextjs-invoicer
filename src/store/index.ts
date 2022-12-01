import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import algorand from "./algorand";
import auth from "./auth";
import loaders from "./loaders";
import reach from "./reach";
import ui from "./ui";

const reducer = combineReducers({
  algorand,
  loaders,
  reach,
  auth,
  ui,
});

const store = configureStore({
  reducer,
});

export default store;

export type AppDispatch = typeof store.dispatch; // Here we export the store's dispatch type
export type RootState = ReturnType<typeof store.getState>; // Here we export the store's state
