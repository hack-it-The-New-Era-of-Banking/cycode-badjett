import React, { useState } from "react";
import PlusSign from "../assets/icons/PlusSign.svg"; // Import the SVG icon
import AddBudgetModalCategory from "../modals/AddBudgetCategory";

const BudgetPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  const openModal = () => setIsModalOpen(true); // Function to open the modal
  const closeModal = () => setIsModalOpen(false); // Function to close the modal

  const budgets = [
    { category: "Groceries", amount: 1000 },
    { category: "Transportation", amount: 800 },
    { category: "Pets", amount: 1000 },
    { category: "Utilities", amount: 1200 },
    { category: "Dining", amount: 900 },
    { category: "Savings", amount: 2000 },
  ];

  return (
    <div className="md:ml-64 min-h-screen pb-32">
      <h1 className=" font-semibold text-black break-words mb-4">My Budgets</h1>
      {/* Budget List - Responsive */}
      <div className="flex flex-wrap gap-4 justify-between">
        {/* Existing Budgets */}
        {budgets.map((budget, index) => (
          <div
            key={index}
            className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-grow h-auto border-2 border-[#6147AA] rounded-xl p-4 shadow-sm flex items-center"
          >
            {/* Ellipse (Logo) */}
            <div className="w-[50px] h-[50px] bg-[#D9D9D9] border-2 border-[#6147AA] rounded-full flex items-center justify-center mr-[15px]">
              <span role="img" aria-label="icon">
                📊
              </span>
            </div>

            {/* Budget Details */}
            <div className="flex-grow">
              <h3 className="text-[20px] font-semibold text-black break-words flex justify-between">
                <span>{budget.category}</span>
                <span className="text-right">₱{budget.amount}</span>
              </h3>
              <p className="text-[16px] text-[#6147AA] font-normal break-words ">
                ₱{budget.amount} Remaining
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
