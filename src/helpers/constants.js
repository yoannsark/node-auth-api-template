exports.urls = {
	subscribeAfterTrial: "pagechecker.io/subscribe",
	authPayment: "pagechecker.io/auth-payment"
}

exports.successMessages = {
	registration: "Registration success.",
	login: "Login success.",
}

exports.validationMessages = {
	emailMissing: "Email must be specified.",
	emailInvalid: "Email must be a valid email address.",
	passwordMissing: "Password must be specified.",
	passwordInvalid: "Password must be 6 characters or greater.",
	tokenMissing: "Token must be specified.",
}

exports.errors = {
	wrongJwt: {
		code: 0,
		message: ""
	},
	unknownUser: {
		code: 1,
		message: "Unknown user."
	},
	bannedUser: {
		code: 2,
		message: "Banned account. Please contact admin."
	},
	emailDuplication: {
		code: 3,
		message: "E-mail already in use."
	},
	validationError: {
		code: 4,
		message: "Validation error."
	},
    wrongCredentials: {
        code: 5,
        message: "Email or password wrong."
    },
}
