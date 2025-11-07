const express = require("express");
const CartItem = require("../models/CartItem");
const Product = require("../models/Product");
const User = require("../models/User");
const router = express.Router();

// add item
router.post("/", async (req, res) => {
  try {
    const { productId, qty = 1, userId } = req.body;
    if (!productId || !userId)
      return res.status(400).json({ error: "productId and userId required" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    let item = await CartItem.findOne({ productId, userId });
    if (item) {
      item.qty = qty;
      await item.save();
    } else {
      item = await CartItem.create({ productId, userId, qty });
    }

    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get cart
router.get("/", async (req, res) => {
  const { userId } = req.query;
  const items = await CartItem.find({ userId }).populate("productId");
  const total = items.reduce(
    (sum, i) => sum + i.productId.price * i.qty,
    0
  );
  res.json({ items, total });
});

// delete item
router.delete("/:id", async (req, res) => {
  await CartItem.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;
