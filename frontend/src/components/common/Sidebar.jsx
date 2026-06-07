import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen">
      <div className="p-4 text-xl font-bold">
        Inventory System
      </div>

      <nav className="flex flex-col gap-2 p-4">
        <Link to="/">Dashboard</Link>

        <Link to="/products">
          Products
        </Link>

        <Link to="/customers">
          Customers
        </Link>

        <Link to="/orders">
          Orders
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;