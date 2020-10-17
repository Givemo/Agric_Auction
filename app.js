const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require("./config/database");

// Connect to Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on("connected", () => {
  console.log(`Connected to database ${config.database}`);
});

// On Error
mongoose.connection.on("error", (err) => {
  console.log(`Database error: ${config.database}`);
});

const app = express();

const users = require("./routes/users");

// Port number
const port = 3000;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, "public")));

//Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

app.use("/users", users);

// Index Route
app.get("/", (req, res) => {
  res.send("<h1>Invalid Endpoint</h1>");
});

// Start Server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
