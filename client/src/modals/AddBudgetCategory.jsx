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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear error when user types
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!formData.category.trim()) {
      setError("Category name is required");
      return;
    }

    if (!formData.budget || parseFloat(formData.budget) <= 0) {
      setError("Please enter a valid budget amount");
      return;
    }

    // Process form submission
    try {
      setIsSubmitting(true);
      setError("");

      // Convert budget to number
      const processedData = {
        ...formData,
        budget: parseFloat(formData.budget),
      };

      console.log("Submitting budget category:", processedData);
      console.log(
        "API URL:",
        `${import.meta.env.VITE_URL}/budget?userId=${currentUser._id}`
      );
      console.log("Auth token:", token);

      const response = await axios.post(
        `${import.meta.env.VITE_URL}/budget?userId=${currentUser._id}`,
        processedData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Budget created successfully:", response.data);

      // Close modal and refresh
      onCancel();

      // Use a more user-friendly notification instead of alert
      // You could use a toast notification library here
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error("Error creating budget:", error);
      setError(
        error.response?.data?.message ||
          "Failed to create budget. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClickOverlay = (e) => {
    // Only close if the overlay itself was clicked
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <>
      {/* Modal Overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
        onClick={handleClickOverlay} // Close modal when clicking outside
      ></div>

      {/* Modal Content */}
      <div className="fixed w-88 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-50">
        <h2 className="text-xl font-semibold mb-4 text-[#6147AA]">
          Add Budget Category
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="categoryName"
              className="block text-sm font-medium text-[#6147AA]"
            >
              Category Name
            </label>
            <input
              type="text"
              id="categoryName"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#6147AA] focus:border-[#6147AA]"
              placeholder="Enter category name"
              disabled={isSubmitting}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="budgetAmount"
              className="block text-sm font-medium text-[#6147AA]"
            >
              Budget Amount
            </label>
            <input
              type="number"
              id="budgetAmount"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#6147AA] focus:border-[#6147AA]"
              placeholder="Enter budget amount"
              disabled={isSubmitting}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-[#6147AA]"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#6147AA] focus:border-[#6147AA]"
              placeholder="Enter description"
              rows="3"
              disabled={isSubmitting}
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 bg-[#6147AA] text-white rounded-md hover:bg-[#503a8c] flex items-center ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Adding...
                </>
              ) : (
                "Add"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddBudgetModalCategory;
