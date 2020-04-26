exports.successResponse = function (res, msg) {
	const data = {
		status: 1,
		message: msg
	};
	return res.status(200).json(data);
};

exports.successResponseWithData = function (res, msg, data) {
	const resData = {
		status: 1,
		message: msg,
		data: data
	};
	return res.status(200).json(resData);
};

exports.errorResponse = function (res, errorCode, msg) {
	const data = {
		status: 0,
		errorCode,
		message: msg,
	};
	return res.status(500).json(data);
};

exports.notFoundResponse = function (res, msg) {
	const data = {
		status: 0,
		message: msg,
	};
	return res.status(404).json(data);
};

exports.validationError = function (res, errorCode, msg) {
	const data = {
		status: 0,
		errorCode,
		message: msg,
	};
	return res.status(400).json(data);
};

exports.validationErrorWithData = function (res, errorCode, msg, data) {
	const resData = {
		status: 0,
		errorCode,
		message: msg,
		data: data
	};
	return res.status(400).json(resData);
};

exports.unauthorizedResponse = function (res, errorCode, msg) {
	const data = {
		status: 0,
		errorCode,
		message: msg,
	};
	return res.status(401).json(data);
};

exports.paymentError = function (res, errorCode) {
	const data = {
		status: 0,
		errorCode
	};
	return res.status(402).json(data);
};
