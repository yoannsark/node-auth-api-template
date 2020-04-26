const jwt = require("express-jwt");
const secret = process.env.JWT_SECRET;

const UserModel = require("../models/UserModel");
const apiResponse = require("../helpers/apiResponse");

const {errors, roles} = require("../helpers/constants");

exports.jwt = jwt({
	secret: secret
});

exports.checkUser = async function(req, res, next) {
	const user = await UserModel.findOne({_id: req.user._id});
	if (!user) {
		return apiResponse.unauthorizedResponse(res, errors.unknownUser.code, errors.unknownUser.message);
	} else if (user.isBan()) {
		return apiResponse.unauthorizedResponse(res, errors.bannedUser.code, errors.bannedUser.message);
	}

	req.userData = user;

	next();
};
