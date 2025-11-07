import api from "../api";

export default function ProductCard({ p, userId }) {
  const addToCart = async () => {
    await api.post("/cart", { productId: p._id, qty: 1, userId });
    alert(`${p.name} added to cart`);
  };
  return (
    <div className="card">
      <h3>{p.name}</h3>
      <p>₹{p.price}</p>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
}
