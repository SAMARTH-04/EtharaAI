import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { createProduct } from "../../services/productService";
import { toast } from "react-toastify";

function ProductForm({ onSuccess, initialData, onSubmit }) {
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({
        name: "",
        sku: "",
        price: "",
        stock_quantity: "",
      });
    }
  }, [initialData, reset]);

  const submitHandler = async (data) => {
    try {
      // CREATE MODE
      if (!initialData) {
        await createProduct(data);
        toast.success("Product created");
        reset();
        onSuccess && onSuccess();
        return;
      }

      // EDIT MODE
      await onSubmit(data);
      reset();
    } catch (err) {
      toast.error("Operation failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-3">
      <input
        placeholder="Name"
        {...register("name")}
        className="border p-2 w-full"
      />

      <input
        placeholder="SKU"
        {...register("sku")}
        className="border p-2 w-full"
      />

      <input
        type="number"
        placeholder="Price"
        {...register("price", { valueAsNumber: true })}
        className="border p-2 w-full"
      />

      <input
        type="number"
        placeholder="Stock"
        {...register("stock_quantity", { valueAsNumber: true })}
        className="border p-2 w-full"
      />

      <button className="bg-blue-600 text-white px-4 py-2">
        Submit
      </button>
    </form>
  );
}

export default ProductForm;