const express = require("express");
const router = express.Router();
const Product = require("../models/item.model");
const config = require("../config/database");
const User = require("../models/user");

// Display products
const displayProducts = (req, res) => {
  Product.find({}).exec((err, products) => {
    if (err) console.log("Display products error --- ", err);
    res.status(200).send({ products });
  });
};

// Display product by ID
const readProductById = (req, res) => {
  const { id } = req.params;
  // Copy and paste one of the product's id to the url when testing it.
  // Use the findById to get a specific product.
  Product.findById(id).exec((err, product) => {
    if (err) console.log("Dispaly Single Product Error---------------", err);
    res.status(200).json({ product });
  });
};

// Get Admin users
const getAdminUsers = (req, res) => {
  User.find().exec((err, users) => {
    if (err) console.log("Find Admin Users Error---------------", err);
    res.status(200).json({ users });
  });
};

// Create product
const createProduct = (req, res) => {
  //Destruct the values sent in from frontend from req.body;
  const { name, description, price, quantity, category, image } = req.body;
  //Have a new Product model instance set to a variable to be save to database.
  let newProduct = new Product({
    name,
    description,
    price,
    quantity,
    category,
    image,
  });
  //use the .save() to save model to database.
  newProduct.save();
  //Then send back the products.
  res.status(200).json({ product: newProduct });
};

// Update product
const updateProduct = (req, res) => {
  //Get the id, since we need to update a specific product.
  //Destruct the id from the request params.
  const { id } = req.params;
  console.log(id);
  //Destruct the update data from the req.body;
  const { name, description, price, quantity, category, image } = req.body;
  //Find the product, and update it's properties
  Product.findById(id).exec((err, product) => {
    if (err) console.log("Updated Product-----------------", err);
    product.name = name;
    product.description = description;
    product.price = price;
    product.quantity = quantity;
    product.category = category;
    product.image = image;
    //Save the product with updated data.
    product.save();
    //Then send back the data, just for testing purposes.
    res.status(200).json({ product });
  });
};

// Delete product
const deleteProduct = (req, res) => {
  //Destruct the id from the request params, since you have to delete a specific product.
  const { id } = req.params;
  //Use an object to delete the specified product.
  Product.deleteOne({ _id: id }).exec((err, product) => {
    if (err) console.log("Delete One Error-----------------", err);
    res.status(200).json({ product });
  });
};

// /api/products
router.route("/").get(displayProducts).post(createProduct);

// /api/products/:id
router
  .route("/:id")
  .get(readProductById)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;
