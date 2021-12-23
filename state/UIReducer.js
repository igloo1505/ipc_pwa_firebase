import * as Types from "./TYPES";
import store from "./store";
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
	navigation: {
		drawer: {
			isOpen: false,
		},
	},
	viewport: {
		width: null,
		height: null,
	},
	colorSelect: {
		shouldShow: false,
		tileId: null,
		currentColor: null,
	},
	notifications: {
		toast: {
			shouldShow: false,
			message: null,
			description: null,
			variant: "danger",
			timeout: 0,
			additionalProps: {},
		},
	},
};

const setNewToastState = (oldState, actionToast) => {
	return {
		...oldState.notifications.toast,
		...actionToast,
		timeout: actionToast.timeout || 3000,
	};
};
const getCloseDrawerState = (oldState) => {
	return {
		...oldState,
		navigation: {
			...oldState.navigation,
			drawer: {
				...oldState.navigation.drawer,
				isOpen: false,
			},
		},
	};
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
	builder.addCase(Types.CLOSE_DRAWER, (state, action) => {
		// state.navigation.drawer.isOpen = !state.navigation.drawer.isOpen;
		return getCloseDrawerState(state);
	});
	builder.addCase(Types.LOGOUT_USER, (state, action) => {
		return getCloseDrawerState(state);
	});
	builder.addCase(Types.SET_VIEWPORT_DIMENSIONS, (state, action) => {
		return {
			...state,
			viewport: {
				...state.viewport,
				width: action.payload?.width ?? state.viewport.width,
				height: action.payload?.height ?? state.viewport.height,
			},
		};
	});
	builder.addCase(Types.SET_COLOR_SELECT_OPTIONS, (state, action) => {
		return {
			...state,
			colorSelect: {
				shouldShow: true,
				tileId: action.payload?.tileId,
				currentColor: action.payload?.currentColor ?? "#e03854",
			},
		};
	});
	builder.addCase(Types.CLOSE_COLOR_SELECT, (state, action) => {
		return {
			...state,
			colorSelect: {
				shouldShow: false,
				tileId: null,
				currentColor: null,
			},
		};
	});
	builder.addCase(Types.SHOW_TOAST_NOTIFICATION, (state, action) => {
		return {
			...state,
			notifications: {
				...state.notifications,
				toast: {
					...state.notifications.toast,
					shouldShow: true,
					message: action.payload?.message,
					description: action.payload?.description,
					variant: action.payload?.variant,
					timeout: action.payload?.timeout ?? 3000,
				},
			},
		};
	});
	builder.addCase(Types.CANCEL_TOAST_NOTIFICATION, (state, action) => {
		return {
			...state,
			notifications: {
				...state.notifications,
				toast: {
					...initialState.notifications.toast,
				},
			},
		};
	});
	builder.addCase(Types.UPDATE_TILE_COLOR_SETTINGS, (state, action) => {
		let newToastData = {
			shouldShow: true,
			message: action.payload?.UIMessage?.text,
			variant: action.payload?.UIMessage?.type,
			additionalProps: {
				...action?.payload?.UIMessage?.additionalProps?.updatedColor,
			},
		};
		return {
			...state,
			notifications: {
				...state.notifications,
				toast: setNewToastState(state, newToastData),
			},
		};
	});
});

export default modalReducer;
