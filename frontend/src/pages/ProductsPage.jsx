import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";
import ProductTable from "../components/products/ProductTable";
import ProductForm from "../components/products/ProductForm";

import {
  getProducts,
  updateProduct,
  deleteProduct,
} from "../services/productService";

import { toast } from "react-toastify";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch {
      toast.error("Failed to load products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      toast.success("Product deleted");
      fetchProducts();
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleUpdate = async (data) => {
    try {
      await updateProduct(editingProduct.id, data);
      toast.success("Product updated");
      setEditingProduct(null);
      fetchProducts();
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">
        Products
      </h1>

      {/* CREATE MODE */}
      {!editingProduct && (
        <ProductForm onSuccess={fetchProducts} />
      )}

      {/* EDIT MODE */}
      {editingProduct && (
        <div className="p-4 border mb-4">
          <h2 className="text-xl font-bold mb-2">
            Edit Product
          </h2>

          <ProductForm
            initialData={editingProduct}
            onSubmit={handleUpdate}
          />

          <button
            onClick={() => setEditingProduct(null)}
            className="mt-2 text-gray-600"
          >
            Cancel
          </button>
        </div>
      )}

      <ProductTable
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </MainLayout>
  );
}

export default ProductsPage;