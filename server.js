const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const connectionDB = require("./config/database");

// set Config path
dotenv.config({ path: "./config/config.env" });

// Connect to MongoDB Atlas
connectionDB();

// Get Statements route
const statements = require("./routes/statements");

console.log(statements);
const app = express();

app.use(express.json());
app.use("/api/statements", statements);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
