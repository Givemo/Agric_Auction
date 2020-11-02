const express = require("express");
const router = express.Router();

const controller = (req, res) => {
  res.send({ msg: "Item route works!!" });
};

// /api/products
router.route("/").get(controller).post(controller);

// /api/products/:id
router.route("/:id").get(controller).put(controller).delete(controller);

module.exports = router;
