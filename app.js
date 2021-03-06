const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require("./config/database");

// Connect To Database (OLD CODE)
mongoose.connect(config.database);
// On Connection
mongoose.connection.on("connected", () => {
  console.log("Connected to Database " + config.database);
});
// On Error
mongoose.connection.on("error", (err) => {
  console.log("Database error " + err);
});

const app = express();

const users = require("./routes/users");
const products = require("./routes/products");
const item = require("./routes/item.route");
const cart = require("./routes/cart.route");

// Port Number
const port = process.env.PORT || 8080;
//const port = 3000;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

app.use("/users", users);
app.use("/api/products", products);
app.use("/api/item", item);
app.use("/api/cart", cart);

// Index Route
app.get("/", (req, res) => {
  res.send("invaild endpoint");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/"));
});

// Start Server
app.listen(port, () => {
  console.log("Server started on port " + port);
});
