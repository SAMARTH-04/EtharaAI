function ProductTable({ products, onEdit, onDelete }) {
  return (
    <table className="w-full border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2">ID</th>
          <th className="border p-2">Name</th>
          <th className="border p-2">SKU</th>
          <th className="border p-2">Price</th>
          <th className="border p-2">Stock</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>

      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td className="border p-2">{product.id}</td>
            <td className="border p-2">{product.name}</td>
            <td className="border p-2">{product.sku}</td>
            <td className="border p-2">{product.price}</td>
            <td className="border p-2">{product.stock_quantity}</td>

            <td className="border p-2 space-x-2">
              <button
                onClick={() => onEdit(product)}
                className="bg-yellow-500 text-white px-2 py-1"
              >
                Edit
              </button>

              <button
                onClick={() => onDelete(product.id)}
                className="bg-red-600 text-white px-2 py-1"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductTable;