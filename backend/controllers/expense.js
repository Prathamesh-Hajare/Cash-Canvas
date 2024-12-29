const ExpenseModel = require('../models/ExpenseModel.js'); // Import the Expense model for database operations

// Function to add a new expense
exports.addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body; // Extract expense details from the request body
    const userId = req.user._id; // Get the user ID from the authenticated user's data (from middleware)

    try {
        // Input Validations
        if (!title || !category || !description || !date) {
            // Check if all required fields are provided
            return res.status(400).json({ message: 'All fields are required!' });
        }
        if (amount <= 0) {
            // Ensure the amount is a positive number
            return res.status(400).json({ message: 'Amount must be a positive number!' });
        }

        // Create a new Expense instance with the provided data
        const expense = new ExpenseModel({
            user: userId, // Associate the expense with the authenticated user
            title,
            amount,
            category,
            description,
            date
        });

        // Save the expense to the database
        await expense.save();
        res.status(201).json({ message: 'Expense added successfully' }); // Send success response

    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error adding expense', error: error.message }); // Send error response
    }
};

// Function to retrieve all expenses for the authenticated user
exports.getExpenses = async (req, res) => {
    const userId = req.user._id; // Get the user ID from the authenticated user's data (from middleware)

    try {
        // Find all expenses for the authenticated user, sorted by creation date in descending order
        const expenses = await ExpenseModel.find({ user: userId }).sort({ createdAt: -1 });
        res.status(200).json(expenses); // Send the list of expenses in the response
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Server Error' }); // Send error response
    }
};

// Function to delete an expense
exports.deleteExpense = async (req, res) => {
    const { id } = req.params; // Extract the expense ID from the request parameters
    const userId = req.user._id; // Get the user ID from the authenticated user's data (from middleware)

    try {
        // Find and delete the expense if it belongs to the authenticated user
        const expense = await ExpenseModel.findOneAndDelete({ _id: id, user: userId });

        if (!expense) {
            // If no expense is found or the user is not authorized to delete it
            return res.status(404).json({ message: 'Expense not found or not authorized to delete' });
        }

        res.status(200).json({ message: 'Expense Deleted' }); // Send success response
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Server Error' }); // Send error response
    }
};
