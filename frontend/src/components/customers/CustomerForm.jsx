import { useForm } from "react-hook-form";
import { createCustomer } from "../../services/customerService";
import { toast } from "react-toastify";

function CustomerForm({ onSuccess }) {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await createCustomer(data);
      toast.success("Customer created");
      reset();
      onSuccess();
    } catch {
      toast.error("Failed to create customer");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-3 p-4 border mb-4"
    >
      <input
        placeholder="Full Name"
        {...register("full_name", { required: true })}
        className="border p-2 w-full"
      />

      <input
        placeholder="Email"
        {...register("email", { required: true })}
        className="border p-2 w-full"
      />

      <input
        placeholder="Phone Number"
        {...register("phone_number", { required: true })}
        className="border p-2 w-full"
      />

      <button className="bg-green-600 text-white px-4 py-2">
        Add Customer
      </button>
    </form>
  );
}

export default CustomerForm;