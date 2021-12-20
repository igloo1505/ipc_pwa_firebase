import * as Types from "./TYPES";
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
	authenticated: false,
	isAdmin: false,
	user: null,
	error: null,
};

const accessReducer = createReducer(initialState, (builder) => {
	builder.addCase(Types.LOGIN_USER, (state, action) => {
		console.log("action: ", action.payload);
		return {
			...state,
			authenticated: true,
			// user: action.payload.user,
			error: null,
		};
	});
});

export default accessReducer;
