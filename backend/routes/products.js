const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

// seed sample products (run once)
router.get("/seed", async (req, res) => {
  const count = await Product.countDocuments();
  if (count > 0) return res.json({ message: "Products already seeded" });

  const sample = [
    { name: "Vintage Hoodie", price: 799, description: "Soft cotton hoodie" },
    { name: "Retro Sneakers", price: 1999, description: "Stylish and comfy" },
    { name: "Denim Jacket", price: 1499, description: "Classic blue jacket" },
    { name: "Graphic Tee", price: 499, description: "Printed round neck tee" },
    { name: "Sports Cap", price: 249, description: "Breathable cotton cap" },
    { name: "Leather Wallet", price: 699, description: "Premium quality wallet" }
  ];

  await Product.insertMany(sample);
  res.json({ message: "Seeded successfully", sample });
});

// get all products
router.get("/", async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

module.exports = router;
