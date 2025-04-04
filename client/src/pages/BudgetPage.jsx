import React from "react";

const BudgetPage = () => {
  const budgets = [
    { category: "Groceries", amount: 1000 },
    { category: "Transportation", amount: 800 },
    { category: "Pets", amount: 1000 },
    { category: "Utilities", amount: 1200 },
    { category: "Dining", amount: 900 },
    { category: "Savings", amount: 2000 },
  ];

  return (
    <div className="md:ml-64 p-6 font-['Mukta'] min-h-screen pb-32">
      {/* App Name */}

      {/* Header */}
      <h1 className="text-[35px] font-semibold text-black break-words mb-4">My Budgets</h1>

      {/* Create Budget Section */}
      <h2 className="text-[35px] font-semibold text-black break-words mb-6">Create a new budget</h2>

      {/* Budget List - Responsive */}
      <div className="flex flex-wrap gap-4 justify-between">
        {budgets.map((budget, index) => (
          <div
            key={index}
            className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-grow h-auto border rounded-xl p-4 shadow-sm"
          >
            <h3 className="text-[35px] font-semibold text-black break-words">{budget.category}</h3>
            <p className="text-[#6147AA] text-[16px] font-normal break-words">₱{budget.amount} Remaining</p>
            <p className="text-[35px] font-normal text-black break-words">₱{budget.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetPage;
