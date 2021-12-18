import {
	createReducer,
	createAction,
	current,
	applyMiddleware,
	configureStore,
	createSlice,
} from "@reduxjs/toolkit";
import { createStore } from "redux";
import UIReducer from "./UIReducer";

const initialState = {};

const withDevtools = () => {
	let withTools = process.env.NODE_ENV !== "production" || true;
	return withTools;
};

const store = configureStore({
	reducer: {
		UI: UIReducer,
	},
	devTools: () => withDevtools(),
});
if (process.env.NODE_ENV !== "production" && typeof window !== "undefined") {
	window.store = store;
}

export default store;
