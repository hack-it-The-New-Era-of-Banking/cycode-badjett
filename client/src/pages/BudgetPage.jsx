import React, { useState, useEffect } from "react";
import axios from "axios";
import PlusSign from "../assets/icons/PlusSign.svg"; // Import the SVG icon
import AddBudgetModalCategory from "../modals/AddBudgetCategory";
import { useUser } from "../context/UserContext"; // Import the user context
import { useNavigate } from "react-router-dom";

const BudgetPage = () => {
  const { token, user } = useUser(); // Get the token from the user context
  const currentUser = user.user;
  const [budgets, setBudgets] = useState([]); // State to store fetched budgets
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const navigate = useNavigate(); // Hook to programmatically navigate

  const openModal = () => setIsModalOpen(true); // Function to open the modal
  const closeModal = () => setIsModalOpen(false); // Function to close the modal

  // Fetch budgets from the API
  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_URL}/budget?userId=${currentUser._id}`,
          {
            headers: {
              Authorization: `${token}`, // Add the token to the Authorization header
            },
          }
        );
        console.log(response.data); // Log the fetched budgets
        setBudgets(response.data); // Update the budgets state with the fetched data
      } catch (error) {
        console.error("Error fetching budgets:", error);
      }
    };

    fetchBudgets();
  }, []); // Run the effect when the token changes

  return (
    <div className="md:ml-64 min-h-screen pb-32">
      <h1 className=" text-black break-words mb-4">My Budgets</h1>
      {/* Budget List - Responsive */}
      <div className="flex flex-wrap gap-4 justify-between">
        {budgets.map((budget, index) => (
          <div
            key={budget._id} // Use budget ID as the key
            onClick={() => navigate(`/budget/${budget._id}`)} // Navigate to the budget page
            className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-grow h-auto border-2 border-[#6147AA] rounded-xl p-4 shadow-sm flex items-center cursor-pointer"
          >
            <div className="w-[50px] h-[50px] bg-[#D9D9D9] border-2 border-[#6147AA] rounded-full flex items-center justify-center mr-[15px]">
              <span role="img" aria-label="icon">
                📊
              </span>
            </div>
            {/* Budget Details */}
            <div className="flex-grow">
              <h3 className="text-[20px] font-semibold text-black break-words flex justify-between">
                <span>{budget.category}</span>
                <span className="text-right">₱{budget.budget}</span>
              </h3>
              <p className="text-[16px] text-[#6147AA] font-normal break-words ">
                ₱{budget.budget} Remaining
              </p>
            </div>
          </div>
        ))}
        {/* Create New Budget Box */}
        <div
          onClick={openModal} // Open the modal when clicked
          className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-grow h-auto border-2 border-[#6147AA] rounded-xl p-4 shadow-sm flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100"
        >
          {/* Plus Icon */}
          <img src={PlusSign} alt="Plus Icon" className="w-6 h-6 mb-2" />
          <p className="text-[16px] font-semibold text-[#6147AA]">
            Create a New Budget
          </p>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <AddBudgetModalCategory onCancel={closeModal} /> // Pass closeModal to the modal
      )}
    </div>
  );
};

export default BudgetPage;
