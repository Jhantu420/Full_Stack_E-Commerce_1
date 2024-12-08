import React, { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import EditProduct from "../components/EditProduct";
import { MdModeEdit } from "react-icons/md";

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null); // State for the product being edited
  const [fetchTrigger, setFetchTrigger] = useState(false); // Trigger for refetching products

  // Fetch products when the component mounts or `fetchTrigger` changes
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:4000/api/get-products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, [fetchTrigger]); // Re-run when `fetchTrigger` changes

  const toggleUploadForm = () => {
    setShowUploadForm(!showUploadForm);
  };

  const closeModal = () => {
    setShowUploadForm(false);
  };

  if (loading) {
    return <div className="text-center p-5">Loading products...</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-center mb-6">All Products</h1>
        <div className="text-center mb-6">
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={toggleUploadForm}
          >
            Upload Product
          </button>
        </div>
      </div>

      {showUploadForm && (
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center"
          onClick={closeModal}
        >
          <div onClick={(e) => e.stopPropagation()}>
            {/* Pass `setFetchTrigger` to trigger refetching */}
            <UploadProduct
              setProducts={setProducts}
              onProductUploaded={() => setFetchTrigger((prev) => !prev)} // Trigger fetch after upload
            />
          </div>
        </div>
      )}

      <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {products.length > 0 ? (
            products.map((item, index) => (
              <div
                key={`${item._id}-${index}`}
                className="bg-white shadow-md rounded-md p-4 hover:shadow-lg transition-shadow"
              >
                <img
                  src={
                    item.imageFiles[0] || "https://via.placeholder.com/150"
                  }
                  alt={item.productName || "Placeholder"}
                  className="w-full h-40 object-cover rounded-md"
                />
                <h2 className="text-lg font-semibold mt-2">
                  {item.productName || "Unnamed Product"}
                </h2>
                <h3 className="text-md font-medium">
                  {item.brandName || "Unknown Brand"}
                </h3>
                <p className="text-gray-600">
                  {item.category || "Uncategorized"}
                </p>
                <p className="text-gray-600">&#8377;{item.price || "N/A"}</p>
                <p className="text-gray-500 text-sm mt-2">
                  {item.description || "No description available."}
                </p>

                <div className="w-fit ml-auto bg-green-400 hover:bg-green-700 p-1 rounded-full cursor-pointer text-white">
                  <button onClick={() => setEditingProduct(item)}>
                    <MdModeEdit />
                  </button>
                </div>

                <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">
              No products available.
            </div>
          )}
        </div>
      </div>

      {editingProduct && (
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center"
          onClick={() => setEditingProduct(null)} // Close modal on outside click
        >
          <div onClick={(e) => e.stopPropagation()}>
            <EditProduct
              setProducts={setProducts}
              product={editingProduct}
              onClose={() => setEditingProduct(null)} // Close modal on button click
              onProductEdited={() => setFetchTrigger((prev) => !prev)} // Trigger fetch after editing
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default AllProducts;
