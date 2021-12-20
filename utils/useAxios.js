import React, { useState, useEffect } from "react";
import store from "../state/store";
import * as Types from "../state/TYPES";
import axios from "axios";

axios.defaults.headers.common["Content-Type"] = "application/json";

const setLoading = (isLoading, timeStart) => {
	console.log("timeStart", timeStart);
	store.dispatch({ type: Types.IS_LOADING, payload: { isLoading, timeStart } });
};
const setResponse = (response) => {
	let timeStop = performance.now();
	store.dispatch({
		type: Types.NETWORK_RESPONSE,
		payload: {
			data: response.data,
			time: timeStop,
		},
	});
};
const setError = (response) => {
	let timeStop = performance.now();
	store.dispatch({
		type: Types.NETWORK_ERROR,
		payload: {
			error: response,
			time: timeStop,
		},
	});
};
async function useAxios(request) {
	let timeStart = performance.now();
	setLoading(true, timeStart);
	try {
		const res = await axios(request);
		setResponse(res);
		return res;
	} catch (error) {
		console.error("This error occurred in the useAxios hook.");
		// setError(error);
		console.error(error);
		return error;
	}
}

export default useAxios;
