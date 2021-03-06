import jwt from "jsonwebtoken";
const tokenExpirationInHours = 24;

export const handleCookies = (cookies, user) => {
	let token = jwt.sign(
		{
			_id: user._id,
			exp: Math.floor(Date.now() / 1000) + 60 * 60 * tokenExpirationInHours,
		},
		process.env.JWT_SECRET
	);
	cookies.set("token", token, {
		maxAge: 1000 * 60 * 60 * tokenExpirationInHours,
		httpOnly: true,
	});
};

export const handleAuth = (cookies, user) => {
	let token = cookies.get("token");
	let auth = {};
	console.log("token: ", token);
	auth.success = false;
	if (token) {
		let decoded = jwt.verify(token, process.env.JWT_SECRET);
		if (decoded._id === user._id.toString()) {
			console.log("user: ", user);
			auth.success = true;
			handleCookies(cookies, user);
		}
		if (decoded._id !== user._id.toString()) {
			console.log("user: ", user);
			auth.success = false;
			cookies
				.set("token", "", { httpOnly: true })
				.set("user", "", { httpOnly: true });
		}
	}
	return auth;
};
