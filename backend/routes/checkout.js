const express = require("express");
const Product = require("../models/Product");
const CartItem = require("../models/CartItem");
const router = express.Router();

router.post("/", async (req, res) => {
  const { cartItems, name, email, userId } = req.body;
  if (!Array.isArray(cartItems) || !cartItems.length)
    return res.status(400).json({ error: "cartItems required" });

  let total = 0;
  const detailed = await Promise.all(
    cartItems.map(async (ci) => {
      const product = await Product.findById(ci.productId);
      const subtotal = product.price * ci.qty;
      total += subtotal;
      return { name: product.name, qty: ci.qty, price: product.price, subtotal };
    })
  );

  await CartItem.deleteMany({ userId });

  res.json({
    receiptId: `rcpt_${Date.now()}`,
    timestamp: new Date(),
    total,
    items: detailed,
    customer: { name, email }
  });
});

module.exports = router;
