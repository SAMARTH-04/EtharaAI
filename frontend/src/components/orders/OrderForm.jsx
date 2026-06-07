import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createOrder } from "../../services/orderService";
import { getCustomers } from "../../services/customerService";
import { getProducts } from "../../services/productService";
import { toast } from "react-toastify";

function OrderForm({ onSuccess }) {
  const { register, handleSubmit, watch, reset } = useForm();

  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const quantity = watch("quantity");
  const selectedProductId = watch("product_id");

  useEffect(() => {
    getCustomers().then(setCustomers);
    getProducts().then(setProducts);
  }, []);

  const selectedProduct = products.find(
    (p) => p.id === Number(selectedProductId)
  );

  const total =
    selectedProduct && quantity
      ? selectedProduct.price * quantity
      : 0;

  const onSubmit = async (data) => {
    try {
      await createOrder(data);
      toast.success("Order created");
      reset();
      onSuccess();
    } catch {
      toast.error("Failed to create order");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 border mb-6 space-y-3"
    >
      <h2 className="text-xl font-bold">Create Order</h2>

      {/* Customer */}
      <select
        {...register("customer_id")}
        className="border p-2 w-full"
      >
        <option value="">Select Customer</option>
        {customers.map((c) => (
          <option key={c.id} value={c.id}>
            {c.full_name}
          </option>
        ))}
      </select>

      {/* Product */}
      <select
        {...register("product_id")}
        className="border p-2 w-full"
      >
        <option value="">Select Product</option>
        {products.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name} - ₹{p.price}
          </option>
        ))}
      </select>

      {/* Quantity */}
      <input
        type="number"
        placeholder="Quantity"
        {...register("quantity", { valueAsNumber: true })}
        className="border p-2 w-full"
      />

      {/* Total Preview */}
      <div className="font-bold text-lg">
        Total: ₹{total}
      </div>

      <button className="bg-purple-600 text-white px-4 py-2">
        Place Order
      </button>
    </form>
  );
}

export default OrderForm;