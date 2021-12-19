import * as Types from "./TYPES";
import store from "./store";
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
	navigation: {
		drawer: {
			isOpen: false,
		},
	},
};

const modalReducer = createReducer(initialState, (builder) => {
	builder.addCase(Types.TOGGLE_DRAWER, (state, action) => {
		// state.navigation.drawer.isOpen = !state.navigation.drawer.isOpen;
		return {
			...state,
			navigation: {
				...state.navigation,
				drawer: {
					...state.navigation.drawer,
					isOpen: action?.payload?.isOpen ?? !state.navigation.drawer.isOpen,
				},
			},
		};
	});
});

export default modalReducer;
