import { useEffect, useState } from "react";
import api from "../api";
import CartItem from "../components/CartItem";

export default function CartPage({ userId }) {
  const [cart, setCart] = useState({ items: [], total: 0 });

  const loadCart = async () => {
    const res = await api.get(`/cart?userId=${userId}`);
    setCart(res.data);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const removeItem = async (id) => {
    await api.delete(`/cart/${id}`);
    loadCart();
  };

  return (
    <div style={{ margin: "20px" }}>
      <h2>Your Cart</h2>
      {cart.items.map((item) => (
        <CartItem key={item._id} item={item} onRemove={removeItem} />
      ))}
      <h3>Total: ₹{cart.total}</h3>
    </div>
  );
}
