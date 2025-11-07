import { useEffect, useState } from "react";
import api from "../api";
import ProductCard from "../components/ProductCard";

export default function ProductsPage({ userId }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products").then((res) => setProducts(res.data));
  }, []);

  return (
    <div className="grid">
      {products.map((p) => (
        <ProductCard key={p._id} p={p} userId={userId} />
      ))}
    </div>
  );
}
