import React, { useContext, useState } from "react";
import axiosInstance from "./axiosIntercepter"; // Updated import

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);

    // Calculate total income
    const addIncome = async (income) => {
        try {
            await axiosInstance.post('add-income', income);
            getIncomes();
        } catch (error) {
            console.log('No Income added');
            setError(error.response?.data?.message || "Error adding income");
        }
    };

    const getIncomes = async () => {
        try {
            const response = await axiosInstance.get('get-incomes');
            setIncomes(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching incomes", error);
            setError(error.response?.data?.message || "Error fetching incomes");
        }
    };

    const deleteIncome = async (id) => {
        try {
            await axiosInstance.delete(`delete-income/${id}`);
            getIncomes();
        } catch (error) {
            console.error("Error deleting income", error);
            setError(error.response?.data?.message || "Error deleting income");
        }
    };

    const totalIncome = () => {
        return incomes.reduce((total, income) => total + income.amount, 0);
    };

    // Calculate total expenses
    const addExpense = async (expense) => {
        try {
            await axiosInstance.post('add-expense', expense);
            getExpenses();
        } catch (error) {
            console.log('No Expense added');
            setError(error.response?.data?.message || "Error adding expense");
        }
    };

    const getExpenses = async () => {
        try {
            const response = await axiosInstance.get('get-expenses');
            setExpenses(response.data);
            console.log("This is expenses",response.data);
        } catch (error) {
            console.error("Error fetching expenses", error);
            setError(error.response?.data?.message || "Error fetching expenses");
        }
    };

    const deleteExpense = async (id) => {
        try {
            await axiosInstance.delete(`delete-expense/${id}`);
            getExpenses();
        } catch (error) {
            console.error("Error deleting expense", error);
            setError(error.response?.data?.message || "Error deleting expense");
        }
    };

    const totalExpenses = () => {
        return expenses.reduce((total, expense) => total + expense.amount, 0);
    };

    const totalBalance = () => {
        return totalIncome() - totalExpenses();
    };

    const transactionHistory = () => {
        const history = [...incomes, ...expenses];
        history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return history.slice(0, 3);
    };

    const alltransactionHistory = () => {
        const history = [...incomes, ...expenses];
        history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return history;
    };

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError,
            alltransactionHistory
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
