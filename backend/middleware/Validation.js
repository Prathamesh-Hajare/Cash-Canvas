const Joi = require("joi"); // Importing Joi library for data validation

// Middleware function for validating signup requests
const signupValidaton = (req, res, next) => {
	// Defining the schema for signup validation
	const schema = Joi.object({
		name: Joi.string().min(3).max(100).required(), // 'name' should be a string between 3 and 100 characters
		email: Joi.string().max(100).required(), // 'email' should be a string with a maximum length of 100 characters
		password: Joi.string().min(4).max(100).required(), // 'password' should be a string between 4 and 100 characters
	});

	// Validating the request body against the schema
	const { error } = schema.validate(req.body);
	if (error) {
		// If validation fails, respond with a 400 status code and the error details
		return res.status(400).json({ message: "Bad Request", error });
	}
	next();
};

// Middleware function for validating login requests
const loginValidaton = (req, res, next) => {
	// Defining the schema for login validation
	const schema = Joi.object({
		email: Joi.string().max(100).required(), // 'email' should be a string with a maximum length of 100 characters
		password: Joi.string().min(4).max(100).required(), // 'password' should be a string between 4 and 100 characters
	});

	// Validating the request body against the schema
	const { error } = schema.validate(req.body);
	if (error) {
		// If validation fails, respond with a 400 status code and the error details
		return res.status(400).json({ message: "Bad Request", error });
	}
	next();
};

module.exports = {
	signupValidaton,
	loginValidaton,
};
