const mongoose = require("mongoose");

// Define Expense Schema
const ExpenseSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User", // Reference to the User model
			required: true,
		},
		title: {
			type: String,
			required: true,
			trim: true,
			maxLength: 50,
		},
		amount: {
			type: Number,
			required: true,
			trim: true,
		},
		type: {
			type: String,
			default: "expense",
		},
		date: {
			type: Date,
			required: true,
		},
		category: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Expense", ExpenseSchema);
