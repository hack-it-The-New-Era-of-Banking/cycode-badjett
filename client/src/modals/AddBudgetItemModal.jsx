import React, { useState } from "react";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_URL
        }/budget/item?userId=${userId}&categoryId=${categoryId}`,
        formData,
        {
          headers: {
            Authorization: ` ${token}`, // Add the token to the Authorization header
          },
        }
      );
      console.log("Item added successfully:", response.data);
      onItemAdded(); // Callback to refresh the parent component
      window.location.reload();
      onCancel(); // Close the modal
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Failed to add item. Please try again.");
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
