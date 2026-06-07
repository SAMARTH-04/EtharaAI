import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import CustomerForm from "../components/customers/CustomerForm";
import CustomerTable from "../components/customers/CustomerTable";

import {
  getCustomers,
  deleteCustomer,
} from "../services/customerService";

import { toast } from "react-toastify";

function CustomersPage() {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch {
      toast.error("Failed to load customers");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteCustomer(id);
      toast.success("Customer deleted");
      fetchCustomers();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">
        Customers
      </h1>

      <CustomerForm onSuccess={fetchCustomers} />

      <CustomerTable
        customers={customers}
        onDelete={handleDelete}
      />
    </MainLayout>
  );
}

export default CustomersPage;