# Expense Tracker

A **full-stack Expense Tracker** application built using the **MERN stack** (MongoDB, Express, React, Node.js) to help users track their expenses, categorize them, and monitor their financial health. The app includes user authentication, real-time balance tracking, and insightful reports.

## Features

- **User Authentication**: Secure user registration, login, and logout with JWT.
- **Add, Edit, and Delete Transactions**: Manage expenses and incomes with simple operations.
- **Expense Categorization**: Assign categories to expenses (e.g., Food, Travel, Utilities).
- **Real-Time Balance Calculation**: Keep track of your income, expenses, and balance.
- **Monthly/Yearly Reports**: Visual charts to help track spending patterns over time.
- **Data Persistence**: All data is securely stored in a MongoDB database.
- **Search and Filter**: Search for expenses and filter them by category or date.


## Installation
   Clone the repository:
   git clone https://github.com/Prathamesh-Hajare/Cash-Canvas.git
   

## Usage

Once the application is running, you can perform the following actions:
1. **Register/Login**: Create an account or log in to track your expenses.
2. **Add Expenses**: Navigate to the "Add Expense" page to input expenses with details like amount, category, and date.
3. **View History**: View the entire transaction history and filter expenses by category or date.
4. **Edit/Delete**: Modify or delete an existing expense.
5. **Track Balance**: The homepage displays your total balance based on income and expenses.
6. **Visualize Data**: View charts and reports showing spending trends over time.

## Technologies Used

### Frontend:
- **React.js**: A JavaScript library for building user interfaces.
- **Axios**: To make HTTP requests to the backend API.
- **React Router**: For handling routing in the app.
- **Bootstrap/Tailwind CSS**: For designing the UI components.
- **Chart.js**: For data visualization.

### Backend:
- **Node.js**: A JavaScript runtime for building server-side applications.
- **Express.js**: A web framework for building the REST API.
- **MongoDB**: A NoSQL database for storing expenses, income, and user data.
- **Mongoose**: An ODM for MongoDB, used to define schemas and interact with the database.
- **JWT (JSON Web Token)**: For secure user authentication and authorization.

## Future Enhancements

- **Dark Mode**: Implement a theme switcher for light/dark mode.
- **Currency Support**: Allow users to select their preferred currency.
- **Recurring Expenses**: Add support for recurring transactions.
- **Budget Management**: Provide a feature to set and manage monthly budgets.
- **Email Notifications**: Send email reminders for bill payments or low balances.
