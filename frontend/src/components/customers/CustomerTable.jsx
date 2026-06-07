function CustomerTable({ customers, onDelete }) {
  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2">ID</th>
          <th className="border p-2">Name</th>
          <th className="border p-2">Email</th>
          <th className="border p-2">Phone</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>

      <tbody>
        {customers.map((c) => (
          <tr key={c.id}>
            <td className="border p-2">{c.id}</td>
            <td className="border p-2">{c.full_name}</td>
            <td className="border p-2">{c.email}</td>
            <td className="border p-2">{c.phone_number}</td>
            <td className="border p-2">
              <button
                onClick={() => onDelete(c.id)}
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

export default CustomerTable;