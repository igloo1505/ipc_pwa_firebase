import * as Types from "./TYPES";
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
	customTileColors: [],
	error: null,
};

const settingReducer = createReducer(initialState, (builder) => {
	builder.addCase(Types.LOGIN_USER, (state, action) => {
		console.log("action: ", action);
		return {
			...state,
			customTileColors: action.payload.user.userSettings.customTileColors.map(
				(ct) => ({
					tileId: ct.tileId,
					textColor: ct.colors.text,
					backgroundColor: ct.colors.background,
				})
			),
		};
	});
	builder.addCase(Types.UPDATE_TILE_COLOR_SETTINGS, (state, action) => {
		console.log("action: ", action.payload);
		let newTileColors = state.customTileColors.filter((t) =>
			action.payload.customTileColors.map((_t) => _t._id).includes(t._id)
		);
		console.log("newTileColors: ", newTileColors);
		return {
			...state,
			customTileColors: newTileColors,
			error: null,
		};
	});
});

export default settingReducer;
