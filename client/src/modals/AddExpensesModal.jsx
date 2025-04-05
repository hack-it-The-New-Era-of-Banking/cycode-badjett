import React from "react";

const AddExpensesModal = ({
  isOpen,
  onClose,
  newExpense,
  handleChange,
  handleAddExpense,
  budgetCategories,
  paymentMethods,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 border-2 border-[#6147AA] rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-bold mb-4 text-[#6147AA]">
          Add New Expense
        </h2>

        {/* Form Fields */}
        <div className="mb-4">
          <label className="block text-[#6147AA] font-semibold mb-2">
            Item:
          </label>
          <input
            type="text"
            name="description"
            placeholder="Enter description"
            className="border-2 border-[#6147AA] rounded-[10px] px-4 py-2 w-full"
            value={newExpense.description || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-[#6147AA] font-semibold mb-2">
            Merchant:
          </label>
          <input
            type="text"
            name="merchant"
            placeholder="Enter merchant name"
            className="border-2 border-[#6147AA] rounded-[10px] px-4 py-2 w-full"
            value={newExpense.merchant || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-[#6147AA] font-semibold mb-2">
            Amount:
          </label>
          <input
            type="number"
            name="amount"
            placeholder="Enter amount"
            className="border-2 border-[#6147AA] rounded-[10px] px-4 py-2 w-full"
            value={newExpense.amount || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-[#6147AA] font-semibold mb-2">
            Category:
          </label>
          <select
            name="category"
            className="border-2 border-[#6147AA] rounded-[10px] px-4 py-2 w-full"
            value={newExpense.category || ""}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {budgetCategories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.category}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-[#6147AA] font-semibold mb-2">
            Payment Method:
          </label>
          <select
            name="paymentMethod"
            className="border-2 border-[#6147AA] rounded-[10px] px-4 py-2 w-full"
            value={newExpense.paymentMethod || "Cash"}
            onChange={handleChange}
            required
          >
            {paymentMethods.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-[#6147AA] font-semibold mb-2">
            Date:
          </label>
          <input
            type="date"
            name="date"
            className="border-2 border-[#6147AA] rounded-[10px] px-4 py-2 w-full text-gray-500"
            value={newExpense.date || ""}
            onChange={handleChange}
            required
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-4">
          <button
            className="bg-gray-200 text-black px-4 py-2 rounded-[10px] border border-gray-300 hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-[#6147AA] text-white px-4 py-2 rounded-[10px] hover:bg-[#503a8c]"
            onClick={handleAddExpense}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddExpensesModal;
