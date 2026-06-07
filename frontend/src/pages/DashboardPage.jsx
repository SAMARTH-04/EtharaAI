import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getDashboardStats } from "../services/dashboardService";
import { toast } from "react-toastify";

function StatCard({ title, value }) {
  return (
    <div className="border p-4 rounded shadow">
      <h3 className="text-gray-500">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

function DashboardPage() {
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch {
      toast.error("Failed to load dashboard");
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      {stats && (
        <div className="grid grid-cols-2 gap-4">
          <StatCard title="Products" value={stats.total_products} />
          <StatCard title="Customers" value={stats.total_customers} />
          <StatCard title="Orders" value={stats.total_orders} />
          <StatCard title="Low Stock" value={stats.low_stock_products} />
        </div>
      )}
    </MainLayout>
  );
}

export default DashboardPage;