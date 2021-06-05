const express = require("express");
const router = express.Router();
const Cart = require("../models/cart.model");
const User = require("../models/user");
const config = require("../config/database");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// Add product to Cart
const addProductToCart = async (req, res) => {
  const { productId, name, price } = req.body;
  let { quantity } = req.body;
  const userId = "5de7ffa74fff640a0491bc4f"; //TODO: the logged in user id
  try {
    let cart = await Cart.findOne({ userId });
    if (cart) {
      //cart exists for user
      let itemIndex = cart.products.findIndex((p) => p.productId == productId);

      if (itemIndex > -1) {
        //product exists in the cart, update the quantity
        let productItem = cart.products[itemIndex];
        productItem.quantity = quantity;
        cart.products[itemIndex] = productItem;
        console.log(cart.products[itemIndex].quantity);
      } else {
        //product does not exists in cart, add new item
        cart.products.push({ productId, quantity, name, price });
      }
      cart = await cart.save();
      return res.status(201).send(cart);
    } else {
      //no cart for user, create new cart
      const newCart = await Cart.create(/*{
        userId,
        products: [{ productId, quantity, name, price }],
      }*/);

      return res.status(201).send(newCart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

// Delete product from Cart
const deleteProduct = (req, res) => {
  //Destruct the id from the request params, since you have to delete a specific product.
  const { id } = req.params;
  //Use an object and $pull subelements of the cart modal, initialise it with an empty object
  Cart.update({}, { $pull: { products: { _id: id } } }).exec((err, product) => {
    if (err) console.log("Delete One Error-----------------", err);
    res.status(200).json({ product });
  });
};
// /api/cart
router.route("/").get(addProductToCart).post(addProductToCart);

// /api/cart/:id
router.route("/:id").get().put(addProductToCart).delete(deleteProduct);

module.exports = router;
