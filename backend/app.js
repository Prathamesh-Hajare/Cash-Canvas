const express = require("express"); // Importing the Express framework to create the server
const cors = require("cors"); // Importing CORS to enable Cross-Origin Resource Sharing
const { db } = require("./db/db"); // Importing the database connection function
const { readdirSync } = require("fs"); // Importing 'readdirSync' to read files synchronously from the file system
const app = express(); // Creating an Express application
const bodyParser = require("body-parser"); // Importing body-parser to handle incoming request bodies

require("dotenv").config(); // Loading environment variables from a .env file

const PORT = process.env.PORT || 8080; // Setting the port from environment variables or using 8080 as default

// Middlewares
app.use(express.json()); // Middleware to parse incoming JSON requests
app.use(cors()); // Middleware to enable CORS for all routes (Allowing API access from other domains)
app.use(bodyParser.json()); // Middleware to parse incoming JSON data in request bodies

// Routes
// Dynamically loading and using all route files from the 'routes' directory.
// Each file in the 'routes' directory defines specific API endpoints.
readdirSync("./routes").map((route) =>
	app.use("/api/v1", require("./routes/" + route))
);

// Server function to start the application
const server = () => {
	db(); // Initialize the database connection. Ensure that db.js exports the connection correctly.
	app.listen(PORT, () => {
		console.log("Server is running on port:", PORT); // Start the server and log the port it's listening on
	});
};

// Error handling middleware (optional)
// You can add a global error handler here for better control of error responses.
app.use((err, req, res, next) => {
	console.error(err.stack); // Log the error
	res.status(500).send("Something went wrong!"); // Send a 500 Internal Server Error response
});

server(); // Invoking the server function to run the application
