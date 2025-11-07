import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";

export default function App() {
  const userId = "6734abcd1234abcd1234abcd"; // mock id
  return (
    <BrowserRouter>
      <nav className="navbar">
        <Link to="/">Products</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/checkout">Checkout</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ProductsPage userId={userId} />} />
        <Route path="/cart" element={<CartPage userId={userId} />} />
        <Route path="/checkout" element={<CheckoutPage userId={userId} />} />
      </Routes>
    </BrowserRouter>
  );
}
