import { useState } from "react";
import api from "../api";
import ReceiptModal from "../components/ReceiptModal";

export default function CheckoutPage({ userId }) {
  const [form, setForm] = useState({ name: "", email: "" });
  const [receipt, setReceipt] = useState(null);

  const handleCheckout = async () => {
    const cart = await api.get(`/cart?userId=${userId}`);
    const res = await api.post("/checkout", {
      cartItems: cart.data.items.map((i) => ({
        productId: i.productId._id,
        qty: i.qty
      })),
      name: form.name,
      email: form.email,
      userId
    });
    setReceipt(res.data);
  };

  return (
    <div style={{ margin: "20px" }}>
      <h2>Checkout</h2>
      <input
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <button onClick={handleCheckout}>Submit</button>

      {receipt && <ReceiptModal receipt={receipt} />}
    </div>
  );
}
