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
    <div className="md:ml-64 p-6 min-h-screen pb-32">

      <h1 className="text-[35px] font-semibold text-black break-words mb-4">My Budgets</h1>

      <h2 className="text-[35px] font-semibold text-black break-words mb-6">Create a new budget</h2>

      {/* Budget List - Responsive */}
    <div className="flex flex-wrap gap-4 justify-between">
      {budgets.map((budget, index) => (
        <div
          key={index}
          className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-grow h-auto border-2 border-[#6147AA] rounded-xl p-4 shadow-sm flex items-center"
          >
          {/* Ellipse (Logo) */}
          <div
            style={{
              width: '50px',
              height: '50px',
              background: '#D9D9D9',
              border: '2px #6147AA solid',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '15px', // Add spacing between the logo and text
            }}
          >
            {/* Replace this with your icon */}
            <span role="img" aria-label="icon">📊</span>
          </div>

          {/* Budget Details */}
          <div className="flex-grow">
            <h3 className="text-[20px] font-semibold text-black break-words flex justify-between">
              <span>{budget.category}</span>
              <span className="text-right">₱{budget.amount}</span>
            </h3>
            <p className="text-[16px] text-[#6147AA] font-normal break-words">₱{budget.amount} Remaining</p>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default BudgetPage;
