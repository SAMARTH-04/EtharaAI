function OrderTable({ orders }) {
  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2">ID</th>
          <th className="border p-2">Customer</th>
          <th className="border p-2">Product</th>
          <th className="border p-2">Qty</th>
          <th className="border p-2">Total</th>
        </tr>
      </thead>

      <tbody>
        {orders.map((o) => (
          <tr key={o.id}>
            <td className="border p-2">{o.id}</td>
            <td className="border p-2">{o.customer_name}</td>
            <td className="border p-2">{o.product_name}</td>
            <td className="border p-2">{o.quantity}</td>
            <td className="border p-2">₹{o.total_amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default OrderTable;