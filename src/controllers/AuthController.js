const UserModel = require("../models/UserModel");

const bcrypt = require("bcryptjs");
const {body} = require("express-validator");
const {sanitizeBody} = require("express-validator");

const validationMiddlewares = require("../middlewares/validation");
const apiResponse = require("../helpers/apiResponse");
const utility = require("../helpers/utility");

const {errors, validationMessages, successMessages} = require("../helpers/constants");

exports.register = [
	body("email")
		.isLength({min: 1}).trim().withMessage(validationMessages.emailMissing)
		.isEmail().withMessage(validationMessages.emailInvalid),
	body("password")
		.isLength({min: 6}).trim().withMessage(validationMessages.passwordInvalid),
	sanitizeBody("email").escape(),
	sanitizeBody("password").escape(),
	validationMiddlewares.checkEmailDuplication,
	validationMiddlewares.checkValidation,
	registerRequest
];

exports.login = [
	body("email")
		.isLength({min: 1}).trim().withMessage(validationMessages.emailMissing)
		.isEmail().withMessage(validationMessages.emailInvalid),
	body("password")
		.isLength({min: 1}).trim().withMessage(validationMessages.passwordMissing),
	sanitizeBody("email").escape(),
	sanitizeBody("password").escape(),
	validationMiddlewares.checkValidation,
	loginRequest
];

async function registerRequest(req, res) {
	const hash = await bcrypt.hash(req.body.password, 10);

	const user = new UserModel({
		email: req.body.email,
		password: hash,
	});

	const saveUser = await user.save();

	const jwtToken = utility.generateJwtToken(saveUser._id, saveUser.email);

	return apiResponse.successResponseWithData(res, successMessages.registration, {
		email: saveUser.email,
		jwtToken
	});
}

async function loginRequest(req, res) {
	const user = await UserModel.findOne({email: req.body.email});
	if (!user) {
		return apiResponse.unauthorizedResponse(res, errors.wrongCredentials.code, errors.wrongCredentials.message);
	}

	const isPasswordCorrect = await user.isPasswordCorrect(req.body.password);
	if (!isPasswordCorrect) {
		return apiResponse.unauthorizedResponse(res, errors.wrongCredentials.code, errors.wrongCredentials.message);
	} else if (user.isBan()) {
		return apiResponse.unauthorizedResponse(res, errors.bannedUser.code, errors.bannedUser.message);
	}

	const jwtToken = utility.generateJwtToken(user._id, user.email);

	return apiResponse.successResponseWithData(res, successMessages.login, {
		jwtToken
	});
}
