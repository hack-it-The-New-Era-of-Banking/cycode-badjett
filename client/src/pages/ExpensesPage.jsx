import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";

const ExpensesPage = () => {
  const { token, user } = useUser();
  const currentUser = user.user;
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [budgetCategories, setBudgetCategories] = useState([]); // State to store budget categories
  const [filters, setFilters] = useState({
    date: "",
    category: "",
    merchant: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
    category: "",
    merchant: "",
    paymentMethod: "Cash",
    date: new Date().toISOString().split("T")[0],
    userId: currentUser._id,
  });

  // Fetch expenses
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_URL}/expense?userId=${currentUser._id}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        console.log("Expenses data:", response.data);
        setExpenses(response.data.expense || []);
        setFilteredExpenses(response.data.expense || []);
      } catch (error) {
        console.error("Error fetching expenses:", error);
        alert("Failed to fetch expenses. Please try again.");
      }
    };

    fetchExpenses();
  }, [currentUser._id, token]);

  // Fetch budget categories for dropdown
  useEffect(() => {
    const fetchBudgetCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_URL}/budget?userId=${currentUser._id}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        setBudgetCategories(response.data);
      } catch (error) {
        console.error("Error fetching budget categories:", error);
      }
    };

    fetchBudgetCategories();
  }, [currentUser._id, token]);

  const applyFilters = () => {
    let filtered = expenses;
    if (filters.date) {
      filtered = filtered.filter(
        (expense) => expense.date && expense.date.split("T")[0] === filters.date
      );
    }
    if (filters.category) {
      filtered = filtered.filter(
        (expense) =>
          expense.category && expense.category._id === filters.category
      );
    }
    if (filters.merchant) {
      filtered = filtered.filter((expense) =>
        expense.description
          ? expense.description
              .toLowerCase()
              .includes(filters.merchant.toLowerCase())
          : false
      );
    }
    setFilteredExpenses(filtered);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewExpense((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddExpense = async () => {
    try {
      const payload = {
        ...newExpense,
        date: new Date(newExpense.date).toISOString(),
        amount: parseFloat(newExpense.amount),
      };

      console.log("Payload for new expense:", payload); // Log the payload for debugging

      const response = await axios.post(
        `${import.meta.env.VITE_URL}/expense?userId=${currentUser._id}`,
        payload,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      console.log("Expense added:", response.data);

      // Refresh expenses after adding
      const updatedResponse = await axios.get(
        `${import.meta.env.VITE_URL}/expense?userId=${currentUser._id}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      setExpenses(updatedResponse.data.expense || []);
      setFilteredExpenses(updatedResponse.data.expense || []);

      // Reset form and close modal
      setNewExpense({
        description: "",
        amount: "",
        category: "",
        merchant: "",
        paymentMethod: "Cash",
        date: new Date().toISOString().split("T")[0],
        userId: currentUser._id,
      });
      closeModal();
    } catch (error) {
      console.error("Error adding expense:", error);
      alert("Failed to add expense. Please try again.");
    }
  };

  const totalSpent = filteredExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  // Payment method options
  const paymentMethods = [
    "Cash",
    "Credit Card",
    "Debit Card",
    "Bank Transfer",
    "Gcash",
    "Maya",
  ];

  return (
    <div className="md:ml-64 min-h-screen ">
      {/* Spending Summary Card */}
      <div className="bg-gray-100 p-4 rounded-[10px] border-2 border-[#6147AA] shadow-md mb-6">
        <h2 className="text-lg font-bold">Spending Summary</h2>
        <p>Total Spent: ₱{totalSpent.toLocaleString()}</p>
        <p>
          AI Tip: "You could save ₱500 this week by reducing dining out
          expenses."
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-4 overflow-x-auto">
        <input
          type="date"
          className="border-2 border-[#6147AA] rounded-[10px] px-4 py-2"
          value={filters.date}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
        />
        <select
          className="border-2 border-[#6147AA] rounded-[10px] px-4 py-2"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="">Filter by Category</option>
          {budgetCategories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.category}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Filter by Merchant/Description"
          className="border-2 border-[#6147AA] rounded-[10px] px-4 py-2"
          value={filters.merchant}
          onChange={(e) => setFilters({ ...filters, merchant: e.target.value })}
        />
        <button
          className="bg-[#6147AA] text-white px-4 py-2 rounded-[10px]"
          onClick={applyFilters}
        >
          Apply Filters
        </button>
        <button
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-[10px]"
          onClick={() => {
            setFilters({ date: "", category: "", merchant: "" });
            setFilteredExpenses(expenses);
          }}
        >
          Clear Filters
        </button>
        <button
          className="bg-[#6147AA] text-white px-4 py-2 rounded-[10px]"
          onClick={openModal}
        >
          Add New Expense
        </button>
      </div>

      {/* Recent Expenses Table */}
      <div className="mt-8 overflow-x-auto">
        <h2 className="text-black text-xl font-bold mb-4">Recent Expenses</h2>
        <table className="table-auto w-full border-collapse border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-primary text-white">
              <th className="border border-gray-300 px-4 py-2">Item</th>
              <th className="border border-gray-300 px-4 py-2">Merchant</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Amount</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses && filteredExpenses.length > 0 ? (
              filteredExpenses.map((expense) => (
                <tr key={expense._id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {expense.description}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {expense.merchant}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(expense.date).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    ₱{expense.amount.toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button className="text-primary">Edit</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="border border-gray-300 px-4 py-2 text-center"
                >
                  No expenses available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Adding Expenses */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center">
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
                name="description" // Changed from "items" to "description" to match state
                placeholder="Enter description"
                className="border-2 border-[#6147AA] rounded-[10px] px-4 py-2 w-full"
                value={newExpense.description || ""} // Added || "" to prevent uncontrolled input
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
                placeholder="Enter merchant name "
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
                value={newExpense.amount || ""} // Added || "" to prevent uncontrolled input
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
                value={newExpense.category || ""} // Added || "" to prevent uncontrolled input
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
                value={newExpense.paymentMethod || "Cash"} // Added fallback
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
                onClick={closeModal}
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
      )}
    </div>
  );
};

export default ExpensesPage;
