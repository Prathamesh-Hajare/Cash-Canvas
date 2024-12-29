const UserModel = require("../models/User.js"); // Import the User model
const jwt = require("jsonwebtoken"); // Import the JSON Web Token (JWT) library for token generation and verification
const bcrypt = require("bcryptjs"); // Import bcryptjs for hashing and comparing passwords

const jwtSecret = process.env.JWT_SECRET; // Get the JWT secret from environment variables
if (!jwtSecret) {
	throw new Error("JWT_SECRET environment variable is not defined"); // Throw an error if the JWT secret is not defined
}

// Signup controller function
const signup = async (req, res) => {
	try {
		const { name, email, password } = req.body; // Extract name, email, and password from the request body

		// Check if user already exists in the database
		const existingUser = await UserModel.findOne({ email });
		if (existingUser) {
			return res
				.status(409)
				.json({ message: "User already exists.", success: false }); // Respond with 409 Conflict if user exists
		}

		// Create a new user instance and hash the password
		const user = new UserModel({ name, email, password });
		user.password = await bcrypt.hash(password, 10); // Hash the password with a salt of 10 rounds
		await user.save(); // Save the new user to the database

		res.status(201).json({
			message: "Signup Successful", // Respond with 201 Created if signup is successful
			success: true,
		});
	} catch (error) {
		console.error(error); // Log any errors to the console
		res.status(500).json({
			message: "Internal Server Error", // Respond with 500 Internal Server Error for unexpected errors
			success: false,
		});
	}
};

// Login controller function
const login = async (req, res) => {
	try {
		const { email, password } = req.body; // Extract email and password from the request body

		// Find the user by email in the database
		const user = await UserModel.findOne({ email });
		if (!user) {
			return res
				.status(404)
				.json({ message: "User not found.", success: false }); // Respond with 404 Not Found if the user doesn't exist
		}

		// Compare the provided password with the stored hashed password
		const isPassEqual = await bcrypt.compare(password, user.password);
		if (!isPassEqual) {
			return res
				.status(403)
				.json({ message: "Invalid password", success: false }); // Respond with 403 Forbidden if passwords do not match
		}

		// Generate a JWT token
		const jwtToken = jwt.sign(
			{ email: user.email, _id: user._id }, // Payload containing user email and ID
			jwtSecret, // Secret key for signing the token
			{ expiresIn: "24h" } // Token expiration time
		);

		res.status(200).json({
			message: "Login Successful", // Respond with 200 OK if login is successful
			success: true,
			jwtToken, // Send the JWT token in the response
			email: user.email,
			name: user.name,
		});
	} catch (error) {
		console.error(error); // Log any errors to the console
		res.status(500).json({
			message: "Internal Server Error", // Respond with 500 Internal Server Error for unexpected errors
			success: false,
		});
	}
};

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
	const token = req.headers["authorization"]; // Extract the token from the Authorization header
	if (!token) {
		console.log("No Token"); // Log message if token is missing
		return res.status(403).send("Token required"); // Respond with 403 Forbidden if no token is provided
	}

	// Verify the token
	jwt.verify(token, jwtSecret, (err, user) => {
		if (err) return res.status(403).send("Invalid token"); // Respond with 403 Forbidden if token verification fails
		req.user = user; // Attach the decoded user object to the request
		next(); // Call the next middleware or route handler
	});
};

module.exports = {
	signup, // Export the signup function
	login, // Export the login function
	authenticateToken, // Export the authenticateToken middleware
};
