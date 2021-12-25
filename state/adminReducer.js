import * as Types from "./TYPES";
import store from "./store";
import { createReducer } from "@reduxjs/toolkit";
import { resetToastState } from "./actions/Actions_UI";

const initialState = {
	addEventFormData: {},
};

const adminReducer = createReducer(initialState, (builder) => {
	builder.addCase(Types.SYNC_ADD_EVENT_FORM_TO_REDUX, (state, action) => {
		return {
			...state,
			addEventFormData: action.payload,
		};
	});
});

export default adminReducer;
