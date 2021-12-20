import useAxios from "../utils/useAxios";
import * as Types from "../state/TYPES";

export const authenticate = (user) => async (dispatch) => {
	try {
		// debugger;
		const res = await useAxios({
			method: "post",
			url: "/api/auth/login",
			data: user,
		});
		console.log("res: ", res.data);
		res?.data?.success &&
			dispatch({
				type: Types.LOGIN_USER,
				payload: res.data,
			});
		if (!res?.data?.success && res?.data?.UIMessage) {
			// TODO come back to this
			dispatch({
				type: Types.SET_UI_MESSAGE,
				payload: res.data.UIMessage,
			});
		}
	} catch (error) {
		console.log(error);
		dispatch({
			type: Types.SERVER_ERROR,
			payload: error,
		});
	}
};
