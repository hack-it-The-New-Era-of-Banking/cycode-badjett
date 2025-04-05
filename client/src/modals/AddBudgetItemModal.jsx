import React, { useState, useEffect } from "react";
import axios from "axios";

const AddBudgetItemModal = ({
  onCancel,
  categoryId,
  userId,
  token,
  onItemAdded,
}) => {
  const [formData, setFormData] = useState({
    itemName: "",
    itemPrice: "",
  });
  const [categoryDetails, setCategoryDetails] = useState(null);
  const [currentTotal, setCurrentTotal] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch category details and current items total
  useEffect(() => {
    const fetchCategoryDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_URL}/budget?id=${categoryId}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        if (response.data) {
          setCategoryDetails(response.data);

          // Calculate current total spent safely
          const total = response.data.categoryItems
            ? response.data.categoryItems.reduce(
                (sum, item) => sum + (item.itemPrice || 0),
                0
              )
            : 0;
          setCurrentTotal(total);
        } else {
          console.error("No data received from API");
          setError("Could not load category details");
        }
      } catch (error) {
        console.error("Error fetching category details:", error);
        setError("Error loading category details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (categoryId && token) {
      fetchCategoryDetails();
    }
  }, [categoryId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear any previous error when user edits the price
    if (name === "itemPrice") {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if adding this item would exceed the budget
    const newItemPrice = parseFloat(formData.itemPrice) || 0;
    const budget = categoryDetails?.budget || 0;

    if (currentTotal + newItemPrice > budget) {
      setError(
        `Adding this item will exceed your budget of ₱${budget.toLocaleString()}`
      );
      return;
    }

    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_URL
        }/budget/item?userId=${userId}&categoryId=${categoryId}`,
        formData,
        {
          headers: {
            Authorization: `${token}`, // Add the token to the Authorization header
          },
        }
      );
      console.log("Item added successfully:", response.data);
      if (onItemAdded) onItemAdded(); // Callback to refresh the parent component
      window.location.reload();
      onCancel(); // Close the modal
    } catch (error) {
      console.error("Error adding item:", error);
      setError("Failed to add item. Please try again.");
    }
  };

  return (
    <>
      {/* Modal Overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
        onClick={onCancel} // Close modal when clicking outside
      ></div>
      {/* Modal Content */}
      <div className="fixed w-88 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-50">
        <h2 className="text-xl font-semibold mb-4 text-primary">
          Add Budget Item
        </h2>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-24">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : error && !categoryDetails ? (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        ) : (
          /* Budget Information */
          categoryDetails && (
            <div className="mb-4 text-sm">
              <p className="font-medium">
                Budget: ₱{(categoryDetails.budget || 0).toLocaleString()}
              </p>
              <p className="font-medium">
                Spent so far: ₱{currentTotal.toLocaleString()} (
                {categoryDetails.budget > 0
                  ? `${Math.round(
                      (currentTotal / categoryDetails.budget) * 100
                    )}%`
                  : "0%"}
                )
              </p>
              <p className="font-medium">
                Remaining: ₱
                {(
                  (categoryDetails.budget || 0) - currentTotal
                ).toLocaleString()}
              </p>
            </div>
          )
        )}

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="itemName"
              className="block text-sm font-medium text-primary"
            >
              Item Name
            </label>
            <input
              type="text"
              id="itemName"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              placeholder="Enter item name"
              required
              disabled={loading}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="itemPrice"
              className="block text-sm font-medium text-primary"
            >
              Item Price
            </label>
            <input
              type="number"
              id="itemPrice"
              name="itemPrice"
              value={formData.itemPrice}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              placeholder="Enter item price"
              required
              disabled={loading}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              onClick={onCancel} // Close modal on cancel
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
              disabled={loading}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddBudgetItemModal;
