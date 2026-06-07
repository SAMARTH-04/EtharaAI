import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";
import OrderForm from "../components/orders/OrderForm";
import OrderTable from "../components/orders/OrderTable";

import { getOrders } from "../services/orderService";
import { toast } from "react-toastify";

function OrdersPage() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch {
      toast.error("Failed to load orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">
        Orders
      </h1>

      <OrderForm onSuccess={fetchOrders} />

      <OrderTable orders={orders} />
    </MainLayout>
  );
}

export default OrdersPage;