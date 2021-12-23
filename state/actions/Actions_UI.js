import * as Types from "../TYPES";
import store from "../store";

export const resetToastState = () => {
	setTimeout(() => {
		store.dispatch({
			type: Types.RESET_TOAST_NOTIFICATION,
		});
	}, 250);
};
