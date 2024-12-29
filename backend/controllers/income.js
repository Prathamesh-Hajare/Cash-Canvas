const IncomeModel = require('../models/IncomeModel.js'); // Import the Income model

// Function to add a new income entry
exports.addIncome = async (req, res) => {
    const { title, amount, category, description, date } = req.body; // Extract data from the request body
    const userId = req.user._id; // Get the user ID from the authenticated user's data

    try {
        // Validations
        if (!title || !category || !description || !date) {
            // Check if all required fields are provided
            return res.status(400).json({ message: 'All fields are required!' });
        }
        if (amount <= 0) {
            // Ensure the amount is a positive number
            return res.status(400).json({ message: 'Amount must be a positive number!' });
        }

        // Create a new Income instance with the provided data
        const income = new IncomeModel({
            user: userId, // Associate the income with the authenticated user
            title,
            amount,
            category,
            description,
            date
        });

        // Save the income to the database
        await income.save();
        res.status(201).json({ message: 'Income Added' }); // Send success response
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Server Error' }); // Send error response
    }
};

// Function to retrieve all income entries for the authenticated user
exports.getIncomes = async (req, res) => {
    const userId = req.user._id; // Get the user ID from the authenticated user's data

    try {
        // Find all income entries for the authenticated user, sorted by creation date in descending order
        const incomes = await IncomeModel.find({ user: userId }).sort({ createdAt: -1 });
        res.status(200).json(incomes); // Send the list of income entries in the response
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Server Error' }); // Send error response
    }
};

// Function to delete an income entry
exports.deleteIncome = async (req, res) => {
    const { id } = req.params; // Extract the income ID from the request parameters
    const userId = req.user._id; // Get the user ID from the authenticated user's data

    try {
        // Find and delete the income entry if it belongs to the authenticated user
        const income = await IncomeModel.findOneAndDelete({ _id: id, user: userId });

        if (!income) {
            // If no income entry is found or the user is not authorized to delete it
            return res.status(404).json({ message: 'Income not found or not authorized to delete' });
        }

        res.status(200).json({ message: 'Income Deleted' }); // Send success response
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Server Error' }); // Send error response
    }
};
