const authMiddleware = require('../middleware/Auth.js');
const { addExpense, getExpenses, deleteExpense } = require('../controllers/expense.js');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income.js');
const { authenticateToken } = require('../controllers/AuthController.js');

const router = require('express').Router();

// Routes for handling income
router.post('/add-income', authenticateToken, authMiddleware, addIncome);
router.get('/get-incomes', authenticateToken, authMiddleware, getIncomes);
router.delete('/delete-income/:id', authenticateToken, authMiddleware, deleteIncome);

// Routes for handling expenses
router.post('/add-expense', authenticateToken, authMiddleware, addExpense); 
router.get('/get-expenses', authenticateToken, authMiddleware, getExpenses);
router.delete('/delete-expense/:id', authenticateToken, authMiddleware, deleteExpense);

module.exports = router;
