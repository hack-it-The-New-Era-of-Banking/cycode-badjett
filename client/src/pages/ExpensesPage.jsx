import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";

const ExpensesPage = () => {
  const { token, user } = useUser();
  const currentUser = user.user;
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [filters, setFilters] = useState({ date: "", category: "", merchant: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newExpense, setNewExpense] = useState({
    item: "",
    merchant: "",
    category: "",
    date: "",
    amount: "",
  });

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_URL}/expenses?userId=${currentUser._id}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        setExpenses(response.data);
        setFilteredExpenses(response.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, [currentUser._id, token]);

  const applyFilters = () => {
    let filtered = expenses;
    if (filters.date) {
      filtered = filtered.filter((expense) => expense.date === filters.date);
    }
    if (filters.category) {
      filtered = filtered.filter((expense) => expense.category === filters.category);
    }
    if (filters.merchant) {
      filtered = filtered.filter((expense) => expense.merchant === filters.merchant);
    }
    setFilteredExpenses(filtered);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddExpense = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/expenses`,
        { ...newExpense, userId: currentUser._id },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setExpenses((prev) => [...prev, response.data]);
      setFilteredExpenses((prev) => [...prev, response.data]);
      closeModal();
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const totalSpent = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="md:ml-64 min-h-screen pb-32">
      {/* Spending Summary Card */}
      <div className="bg-gray-100 p-4 rounded-[10px] border-2 border-[#6147AA] shadow-md mb-6">
        <h2 className="text-lg font-bold">Spending Summary</h2>
        <p>Total Spent: ₱{totalSpent}</p>
        <p>AI Tip: "You could save ₱500 this week by reducing dining out expenses."</p>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <select
          className="border-2 border-[#6147AA] rounded-[10px] px-4 py-2"
          value={filters.date}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
        >
          <option value="">Filter by Date</option>
        </select>
        <select
          className="border-2 border-[#6147AA] rounded-[10px] px-4 py-2"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="">Filter by Category</option>
        </select>
        <select
          className="border-2 border-[#6147AA] rounded-[10px] px-4 py-2"
          value={filters.merchant}
          onChange={(e) => setFilters({ ...filters, merchant: e.target.value })}
        >
          <option value="">Filter by Merchant</option>
        </select>
        <button
          className="bg-[#6147AA] text-white px-4 py-2 rounded-[10px]"
          onClick={applyFilters}
        >
          Apply Filters
        </button>
        <button
          className="bg-[#6147AA] text-white px-4 py-2 rounded-[10px]"
          onClick={openModal}
        >
          Add New Expense
        </button>
      </div>

      {/* Recent Expenses Table */}
      <div className="mt-8">
        <h2 className="text-black text-xl font-bold mb-4">Recent Expenses</h2>
        <table className="w-full border-collapse border-2 border-[#6147AA] rounded-[10px]">
          <thead>
            <tr className="bg-[#F3E8FF]">
              <th className="border-2 border-[#6147AA] px-4 py-2">Item</th>
              <th className="border-2 border-[#6147AA] px-4 py-2">Merchant</th>
              <th className="border-2 border-[#6147AA] px-4 py-2">Category</th>
              <th className="border-2 border-[#6147AA] px-4 py-2">Date</th>
              <th className="border-2 border-[#6147AA] px-4 py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((expense) => (
              <tr key={expense._id} className="text-center">
                <td className="border-2 border-[#6147AA] px-4 py-2">{expense.item}</td>
                <td className="border-2 border-[#6147AA] px-4 py-2">{expense.merchant}</td>
                <td className="border-2 border-[#6147AA] px-4 py-2">{expense.category}</td>
                <td className="border-2 border-[#6147AA] px-4 py-2">{expense.date}</td>
                <td className="border-2 border-[#6147AA] px-4 py-2">₱{expense.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Adding Expenses */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-[10px] shadow-lg">
            <h2 className="text-lg font-bold mb-4">Add New Expense</h2>
            <input
              type="text"
              placeholder="Item"
              className="border-2 border-[#6147AA] rounded-[10px] px-4 py-2 mb-2 w-full"
              value={newExpense.item}
              onChange={(e) => setNewExpense({ ...newExpense, item: e.target.value })}
            />
            <input
              type="text"
              placeholder="Merchant"
              className="border-2 border-[#6147AA] rounded-[10px] px-4 py-2 mb-2 w-full"
              value={newExpense.merchant}
              onChange={(e) => setNewExpense({ ...newExpense, merchant: e.target.value })}
            />
            <input
              type="text"
              placeholder="Category"
              className="border-2 border-[#6147AA] rounded-[10px] px-4 py-2 mb-2 w-full"
              value={newExpense.category}
              onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
            />
            <input
              type="date"
              className="border-2 border-[#6147AA] rounded-[10px] px-4 py-2 mb-2 w-full"
              value={newExpense.date}
              onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
            />
            <input
              type="number"
              placeholder="Amount"
              className="border-2 border-[#6147AA] rounded-[10px] px-4 py-2 mb-2 w-full"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
            />
            <button
              className="bg-[#6147AA] text-white px-4 py-2 rounded-[10px] mt-4"
              onClick={handleAddExpense}
            >
              Add Expense
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-[10px] mt-4 ml-2"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpensesPage;