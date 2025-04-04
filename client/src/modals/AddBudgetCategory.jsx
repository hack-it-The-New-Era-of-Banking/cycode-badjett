import { useState } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";

const AddBudgetModalCategory = ({ onCancel }) => {
  const { user, token } = useUser();
  const currentUser = user.user; // Get the current user
  const [formData, setFormData] = useState({
    category: "",
    budget: "",
    description: "",
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
        `${import.meta.env.VITE_URL}/budget?userId=${currentUser._id}`,
        formData,
        {
          headers: {
            Authorization: `${token}`, // Add the token to the Authorization header
          },
        }
      );
      console.log("Budget created successfully:", response.data);
      alert("Budget created successfully!");
      onCancel(); // Close the modal after successful submission
    } catch (error) {
      console.error("Error creating budget:", error);
      alert("Failed to create budget. Please try again.");
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
          Add Budget Category
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="categoryName"
              className="block text-sm font-medium text-primary"
            >
              Category Name
            </label>
            <input
              type="text"
              id="categoryName"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              placeholder="Enter category name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="budgetAmount"
              className="block text-sm font-medium text-primary"
            >
              Budget Amount
            </label>
            <input
              type="number"
              id="budgetAmount"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              placeholder="Enter budget amount"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-primary"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              placeholder="Enter description"
              rows="3"
              required
            ></textarea>
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

export default AddBudgetModalCategory;
