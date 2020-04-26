const crypto = require("crypto");
const jwt = require("jsonwebtoken");

exports.randomString = function() {
	return crypto.randomBytes(16).toString("hex");
};

exports.generateJwtToken = function(userId, userEmail) {
	const jwtPayload = {
		_id: userId,
		email: userEmail
	};

	const jwtData = {
		expiresIn: process.env.JWT_TIMEOUT_DURATION,
	};
	const secret = process.env.JWT_SECRET;
	return jwt.sign(jwtPayload, secret, jwtData);
};

exports.getCurrentTimeStamp = function() {
	return Math.round((new Date()).getTime() / 1000);
}
