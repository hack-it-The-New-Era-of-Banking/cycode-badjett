import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/UserContext"; // Import the UserContext to access the token
import PlusSign from "../assets/icons/PlusSign.svg"; // Import the SVG icon
import AddBudgetItemModal from "../modals/AddBudgetItemModal"; // Import the modal

const BudgetItemPage = () => {
  const { id } = useParams(); // Get the category ID from the URL
  const [category, setCategory] = useState(null); // State to store category details
  const [subcategories, setSubcategories] = useState([]); // State to store subcategories
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage errors
  const { token } = useUser(); // Get the token from the UserContext
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_URL}/budget?id=${id}`,
          {
            headers: {
              Authorization: `${token}`, // Add the token to the Authorization header
            },
          }
        );
        console.log(response.data); // Log the fetched category data
        setCategory(response.data); // Set the category details
        setSubcategories(response.data.categoryItems || []); // Set the subcategories (categoryItems)
        setLoading(false); // Stop loading
      } catch (err) {
        console.error("Error fetching category:", err);
        setError("Failed to fetch category data. Please try again.");
        setLoading(false); // Stop loading
      }
    };

    fetchCategory();
  }, [id]); // Run the effect when the `id` changes

  const handleItemAdded = () => {
    // Refresh the category data after adding an item
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_URL}/budget?id=${id}`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        setCategory(response.data);
        setSubcategories(response.data.categoryItems || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error refreshing category data:", err);
        setError("Failed to refresh category data. Please try again.");
        setLoading(false);
      });
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while fetching data
  }

  if (error) {
    return <div>{error}</div>; // Show an error message if fetching fails
  }

  return (
    <div className="md:ml-64">
      {/* Main Category Box */}
      <div className="w-full h-auto border-2 border-[#6147AA] rounded-xl p-6 shadow-sm flex items-center mb-6">
        {/* Ellipse (Logo) */}
        <div
          className="flex items-center justify-center mr-4 bg-[#D9D9D9] border-2 border-[#6147AA] rounded-full 
          w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] lg:w-[70px] lg:h-[70px]"
        >
          {/* Replace this with your icon */}
          <span role="img" aria-label="icon">
            📊
          </span>
        </div>

        {/* Category Details */}
        <div className="flex-grow">
          <h1 className="font-semibold text-black break-words">
            {category?.category || "Category Name"}
          </h1>

          <p className="font-normal text-black">₱{category?.budget || 0}</p>
          <p className="font-normal text-black">
            Description: {category?.description || "No description"}
          </p>
        </div>

        <img
          src={PlusSign}
          alt="Plus Icon"
          onClick={() => setIsModalOpen(true)} // Open the modal when clicked
          className="w-6 h-6 mb-2 cursor-pointer"
        />
      </div>

      {/* Subcategories List - Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {subcategories.map((subcategory, index) => (
          <div
            key={subcategory._id || index}
            className="border-2 border-[#6147AA] rounded-xl p-4 shadow-sm flex justify-between items-center"
          >
            <span className="text-[16px] font-normal text-black">
              {subcategory.itemName || "Unnamed Item"}
            </span>
            <span className="text-[16px] font-normal text-black">
              ₱{subcategory.itemPrice || 0}
            </span>
          </div>
        ))}
      </div>

      {/* Add Budget Item Modal */}
      {isModalOpen && (
        <AddBudgetItemModal
          onCancel={() => setIsModalOpen(false)} // Close the modal
          categoryId={id} // Pass the category ID
          token={token} // Pass the token
          onItemAdded={handleItemAdded} // Callback to refresh the data
        />
      )}
    </div>
  );
};

export default BudgetItemPage;
