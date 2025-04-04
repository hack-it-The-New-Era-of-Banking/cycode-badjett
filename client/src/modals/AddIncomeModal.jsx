import { useState } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";

const AddIncomeModal = ({ onCancel }) => {
  const { user, token } = useUser();
  const currentUser = user.user; // Get the current user
  const [formData, setFormData] = useState({
    jobTitle: "",
    earnedIncome: "",
    additionalCompensation: "",
    category: "Passive", // Default value
    dateReceived: "", // Will be set dynamically
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
        `${import.meta.env.VITE_URL}/income?userId=${currentUser._id}`, // Use the provided API endpoint
        {
          ...formData,
          dateReceived: new Date().toISOString(),
        },
        {
          headers: {
            Authorization: ` ${token}`, // Add the token to the Authorization header
          },
        }
      );
      console.log("Income added successfully:", response.data);
      alert("Income added successfully!");
      onCancel(); // Close the modal after successful submission
      window.location.reload();
    } catch (error) {
      console.error("Error adding income:", error);
      alert("Failed to add income. Please try again.");
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
        <h2 className="text-xl font-semibold mb-4 text-primary">Add Income</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="jobTitle"
              className="block text-sm font-medium text-primary"
            >
              Job Title
            </label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              placeholder="Enter job title"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="earnedIncome"
              className="block text-sm font-medium text-primary"
            >
              Earned Income
            </label>
            <input
              type="number"
              id="earnedIncome"
              name="earnedIncome"
              value={formData.earnedIncome}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              placeholder="Enter earned income"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="additionalCompensation"
              className="block text-sm font-medium text-primary"
            >
              Additional Compensation
            </label>
            <input
              type="number"
              id="additionalCompensation"
              name="additionalCompensation"
              value={formData.additionalCompensation}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              placeholder="Enter additional compensation"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-primary"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              required
            >
              <option value="Passive">Passive</option>
              <option value="Monthly">Monthly</option>
            </select>
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

export default AddIncomeModal;
