const express = require("express");
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 100,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

itemSchema.index({ list: 1, name: 1 }, { unique: true });
const Product = (module.exports = mongoose.model("Product", itemSchema));

module.exports.addProduct = function (newProduct, callback) {
  newProduct.save(callback);
};
