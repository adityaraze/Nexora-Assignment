export default function CartItem({ item, onRemove }) {
  return (
    <div style={{ marginBottom: "10px" }}>
      {item.productId.name} - {item.qty} × ₹{item.productId.price}
      <button
        style={{ marginLeft: "10px" }}
        onClick={() => onRemove(item._id)}
      >
        Remove
      </button>
    </div>
  );
}
