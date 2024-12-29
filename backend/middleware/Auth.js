const jwt = require("jsonwebtoken");
const UserModel = require("../models/User.js");

const authMiddleware = async (req, res, next) => {
	const user = req.user;

	if (!user) {
		return res.status(401).json({ message: "No user Access Denied 2" });
	}

	try {
		// Find the user associated with the token
		const foundUser = await UserModel.findById(user._id);

		if (!foundUser) {
			return res.status(401).json({ message: "User not found" });
		}

		// Attach the user to the request object for further use
		req.user = foundUser;
		next();
	} catch (error) {
		// Handle errors in token verification
		res.status(500).json({ message: "Internal Server Error" });
	}
};

module.exports = authMiddleware;
