export default function ReceiptModal({ receipt }) {
  return (
    <div
      style={{
        marginTop: "20px",
        border: "1px solid #ddd",
        padding: "10px",
        borderRadius: "8px",
      }}
    >
      <h3>Receipt</h3>
      <p>ID: {receipt.receiptId}</p>
      <p>Total: ₹{receipt.total}</p>
      <p>Date: {new Date(receipt.timestamp).toLocaleString()}</p>
      <ul>
        {receipt.items.map((i, idx) => (
          <li key={idx}>
            {i.name} — {i.qty} × ₹{i.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
