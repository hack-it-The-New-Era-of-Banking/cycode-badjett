import React from "react";
import { useParams } from "react-router-dom";

const BudgetItemPage = () => {
  const { id } = useParams();
  const category = { name: "Groceries", amount: 5000, unallocated: 2750 }; // Example category
  const subcategories = [
    { name: "Vegetables", amount: 500 },
    { name: "Meat", amount: 400 },
    { name: "Pets", amount: 500 },
    { name: "Fruits", amount: 250 },
    { name: "Toiletries", amount: 400 },
    { name: "Clothing", amount: 500 },
    { name: "Toiletries", amount: 400 },
    { name: "Clothing", amount: 500 },
  ];

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
          <h1 className="text-[20px] font-semibold text-black break-words">
            {category.name}
          </h1>
          <div className="flex justify-between items-center">
            <span className="text-[20px] font-normal text-black">
              ₱{category.amount}
            </span>
            <span className="text-[16px] font-normal text-black">
              Unallocated: ₱{category.unallocated}
            </span>
          </div>
        </div>
      </div>

      {/* Subcategories List - Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {subcategories.map((subcategory, index) => (
          <div
            key={index}
            className="border-2 border-[#6147AA] rounded-xl p-4 shadow-sm flex justify-between items-center"
          >
            <span className="text-[16px] font-normal text-black">
              {subcategory.name}
            </span>
            <span className="text-[16px] font-normal text-black">
              ₱{subcategory.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetItemPage;
