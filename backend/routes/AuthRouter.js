const { signup, login } = require("../controllers/AuthController.js"); // Import the signup and login controller functions
const {
	signupValidaton,
	loginValidaton,
} = require("../middleware/Validation.js"); // Import validation middlewares for signup and login
const Router = require("express").Router(); // Create a new instance of the Express Router

// Middleware to handle validation errors
const handleValidation = (req, res, next) => {
	const { validationResult } = require("express-validator"); // Import the validationResult function from express-validator
	const errors = validationResult(req); // Check for validation errors in the request
	if (!errors.isEmpty()) {
		// If there are errors, return a 400 Bad Request response with the errors array
		return res.status(400).json({ errors: errors.array() });
	}
	next(); // If no errors, proceed to the next middleware or route handler
};

// Routes
Router.post("/login", loginValidaton, handleValidation, login); // Define a POST route for /login with validation middleware and error handling
Router.post("/signup", signupValidaton, handleValidation, signup); // Define a POST route for /signup with validation middleware and error handling

module.exports = Router; // Export the router instance for use in other parts of the application
