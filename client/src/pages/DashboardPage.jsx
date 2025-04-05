import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import ExpensesBarChart from "../components/dashboard/ExpensesBarChart";
import BalanceLineChart from "../components/dashboard/BalanceLineChart";
import axios from "axios";
import ReactMarkdown from "react-markdown"; // Import React Markdown

const DashboardPage = () => {
  const { user, token } = useUser();
  const currentUser = user.user;
  const navigate = useNavigate(); // Initialize navigate hook

  // State declarations
  const [showInterestsModal, setShowInterestsModal] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [totalBudget, setTotalBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [insightData, setInsightData] = useState({
    message: "Loading financial insights...",
    loading: true,
    error: null,
  });

  // Check if user has already selected interests when component mounts
  useEffect(() => {
    const storedInterests = localStorage.getItem(
      `interests_${currentUser._id}`
    );
    if (storedInterests) {
      // User has already selected interests
      setSelectedInterests(JSON.parse(storedInterests));
    } else {
      // User hasn't selected interests yet, show the modal
      setShowInterestsModal(true);
    }
  }, [currentUser._id]);

  // Fetch insights from the server
  useEffect(() => {
    const fetchExpenseInsights = async () => {
      try {
        setInsightData((prev) => ({ ...prev, loading: true, error: null }));

        // Make POST request to /insight/expense with empty body
        const response = await axios.post(
          `${import.meta.env.VITE_URL}/insight`,
          {}, // Empty body
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        console.log("Expense insights response:", response.data.reply);
        // Update state with the response data
        setInsightData({
          tip:
            response.data.reply ||
            "You could save money by reviewing your spending patterns.",
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error("Error fetching expense insights:", error);
        setInsightData({
          tip: "Unable to load expense insights at this time.",
          loading: false,
          error: error.message || "An error occurred",
        });
      }
    };

    // Call the function when component mounts
    fetchExpenseInsights();
  }, [token]); // Only depends on token

  const interests = [
    { id: 1, name: "Sports", icon: "⚽" },
    { id: 2, name: "Music", icon: "🎵" },
    { id: 3, name: "Travel", icon: "✈️" },
    { id: 4, name: "Art", icon: "🎨" },
    { id: 5, name: "Technology", icon: "💻" },
    { id: 6, name: "Food", icon: "🍔" },
    { id: 7, name: "Video Games", icon: "🎮" },
    { id: 8, name: "Comics and Manga", icon: "📚" },
    { id: 9, name: "Self-Care", icon: "🛀" },
    { id: 10, name: "Travelling", icon: "🌍" },
    { id: 11, name: "Home Decorations", icon: "🏠" },
    { id: 12, name: "Sneaker Collecting", icon: "👟" },
  ];

  const toggleInterest = (id) => {
    setSelectedInterests((prev) =>
      prev.includes(id)
        ? prev.filter((interest) => interest !== id)
        : [...prev, id]
    );
  };

  const handleInterestsSubmit = () => {
    console.log("Selected Interests:", selectedInterests);

    // Save interests to localStorage with user ID as part of the key
    localStorage.setItem(
      `interests_${currentUser._id}`,
      JSON.stringify(selectedInterests)
    );

    // Optional: Save interests to backend
    // saveInterestsToBackend(selectedInterests);

    setShowInterestsModal(false); // Close the modal after submission
  };

  const handleInterestsClose = () => {
    // If user cancels without selecting, set at least one default interest
    if (selectedInterests.length === 0) {
      const defaultInterests = [1]; // Default to "Sports"
      setSelectedInterests(defaultInterests);
      localStorage.setItem(
        `interests_${currentUser._id}`,
        JSON.stringify(defaultInterests)
      );
    } else {
      // Save whatever they had selected
      localStorage.setItem(
        `interests_${currentUser._id}`,
        JSON.stringify(selectedInterests)
      );
    }
    setShowInterestsModal(false);
  };

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_URL}/budget?userId=${currentUser._id}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        setBudgets(response.data);
        const total = response.data.reduce(
          (sum, budget) => sum + (budget.budget || 0),
          0
        );
        setTotalBudget(total);
      } catch (error) {
        console.error("Error fetching budgets:", error);
      }
    };

    fetchBudgets();
  }, [currentUser._id, token]);

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
        setExpenses(response.data.expense || []);
        setTotalExpenses(response.data.month || 0);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, [currentUser._id, token]);

  return (
    <>
      {showInterestsModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md sm:max-w-lg lg:max-w-xl border-2 border-[#6147AA] rounded-xl shadow-lg mx-4 max-h-[90vh] overflow-hidden">
            <div className="p-6 overflow-y-auto max-h-[80vh]">
              <h2 className="text-lg font-bold mb-4 text-[#6147AA]">
                Select Your Interests
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Choose your interests to personalize your experience.
              </p>

              {/* Interests Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {interests.map((interest) => (
                  <div
                    key={interest.id}
                    onClick={() => toggleInterest(interest.id)}
                    className={`flex flex-col items-center justify-center p-4 border-2 rounded-xl cursor-pointer ${
                      selectedInterests.includes(interest.id)
                        ? "border-[#6147AA] bg-[#F3E8FF]"
                        : "border-gray-300"
                    }`}
                  >
                    <span className="text-3xl mb-2">{interest.icon}</span>
                    <p className="text-sm font-semibold text-gray-700">
                      {interest.name}
                    </p>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4 mt-6">
                <button
                  className="bg-gray-200 text-black px-4 py-2 rounded-[10px] border border-gray-300 hover:bg-gray-300"
                  onClick={handleInterestsClose}
                >
                  Cancel
                </button>
                <button
                  className="bg-[#6147AA] text-white px-4 py-2 rounded-[10px] hover:bg-[#503a8c]"
                  onClick={handleInterestsSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="md:ml-64 relative z-10 p-4 sm:p-6">
        {/* Dashboard Greetings */}
        <div className="mb-4">
          <h1 className="text-xl font-bold text-gray-800">
            Hi, {currentUser.firstName}
          </h1>
          <p className="text-gray-600">
            Here's what's happening to your finances 👋
          </p>
        </div>

        {/* Dashboard AI Insight - Updated with React Markdown */}
        <div className="bg-white border-2 mb-6 border-[#6147AA] rounded-lg p-4 shadow-md transition-all duration-300">
          {insightData.loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6147AA]"></div>
            </div>
          ) : insightData.error ? (
            <div className="text-red-500 p-4">
              <p className="font-semibold">Error loading insights</p>
              <p className="text-sm">{insightData.error}</p>
              <button
                className="mt-2 bg-[#6147AA] text-white px-3 py-1 rounded-lg text-sm"
                onClick={() => {
                  setInsightData((prev) => ({
                    ...prev,
                    loading: true,
                    error: null,
                  }));
                  // Retry fetching insights
                  fetchExpenseInsights();
                }}
              >
                Retry
              </button>
            </div>
          ) : (
            <div className="p-2">
              <div className="flex items-start mb-3">
                <div className="w-10 h-10 bg-[#F3E8FF] rounded-full flex items-center justify-center mr-3">
                  <span role="img" aria-label="bulb" className="text-xl">
                    💡
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">
                    AI Financial Insight
                  </h3>
                  <p className="text-sm text-gray-500">
                    Based on your spending patterns and interests
                  </p>
                </div>
              </div>

              {/* Replace regular paragraph with ReactMarkdown */}
              <div className="text-gray-700 prose prose-sm max-w-none">
                <ReactMarkdown>{insightData.tip}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>

        {/* Dashboard Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 border-2 border-[#6147AA] rounded-lg shadow-sm">
            <p className="text-gray-500 text-sm">Total Budget</p>
            <p className="text-xl font-bold">₱{totalBudget.toLocaleString()}</p>
          </div>

          <div className="bg-white p-4 border-2 border-[#6147AA] rounded-lg shadow-sm">
            <p className="text-gray-500 text-sm">Total Expenses</p>
            <p className="text-xl font-bold">
              ₱{totalExpenses.toLocaleString()}
            </p>
          </div>

          <div className="bg-white p-4 border-2 border-[#6147AA] rounded-lg shadow-sm">
            <p className="text-gray-500 text-sm">Balance</p>
            <p className="text-xl font-bold">
              ₱{(totalBudget - totalExpenses).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Dashboard Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 mb-4">
          <div className="border-2 border-primary rounded-lg p-4">
            <p className="title">Expenses Last 7 days</p>
            <ExpensesBarChart />
          </div>
          <div className="border-2 border-primary rounded-lg p-4">
            <p className="title">Balance for months</p>
            <BalanceLineChart />
          </div>
        </div>

        {/* User Budgets - Updated with real data */}
        <div className="mb-4">
          <h2 className="mb-4 text-lg font-semibold">Budgets</h2>
          <div className="flex flex-wrap gap-4">
            {budgets.length === 0 ? (
              <div className="border-2 border-primary rounded-lg p-4 flex-grow flex items-center justify-center min-h-36">
                <div className="text-center">
                  <p className="text-gray-500 mb-2">No budget categories yet</p>
                  <button
                    onClick={() => navigate("/budget")}
                    className="bg-[#6147AA] text-white px-4 py-2 rounded-lg"
                  >
                    Create Your First Budget
                  </button>
                </div>
              </div>
            ) : (
              <>
                {budgets.slice(0, 3).map((budget) => {
                  // Calculate the total spent by summing up itemPrice in categoryItems
                  const totalSpent =
                    budget.categoryItems?.reduce(
                      (sum, item) => sum + (item.itemPrice || 0),
                      0
                    ) || 0;

                  // Calculate percentage spent (capped at 100%)
                  const percentSpent = Math.min(
                    (totalSpent / (budget.budget || 1)) * 100,
                    100
                  );

                  return (
                    <div
                      key={budget._id}
                      onClick={() => navigate(`/budget/${budget._id}`)}
                      className="border-2 border-primary rounded-lg p-4 flex-grow cursor-pointer hover:bg-gray-50 transition-colors min-w-0 sm:min-w-80"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-12 h-12 bg-[#D9D9D9] border-2 border-[#6147AA] rounded-full flex items-center justify-center mr-2">
                            <span role="img" aria-label="icon">
                              📊
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">
                              {budget.category}
                            </p>
                            <p className="text-sm text-gray-600">
                              ₱{totalSpent.toLocaleString()} of ₱
                              {(budget.budget || 0).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="relative w-full h-2 bg-gray-200 rounded-lg">
                          <div
                            className="absolute top-0 left-0 h-full bg-primary rounded-lg"
                            style={{ width: `${percentSpent}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 text-right">
                          {percentSpent.toFixed(0)}% used
                        </p>
                      </div>
                    </div>
                  );
                })}

                {/* View all budgets button */}
                {/* {budgets.length > 0 && (
                  <div
                    onClick={() => navigate("/budget")}
                    className="border-2 border-primary rounded-lg p-4 flex-grow cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-center min-w-0 sm:min-w-80"
                  >
                    <div className="text-center">
                      <div className="w-12 h-12 bg-[#F3E8FF] border-2 border-[#6147AA] rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-xl">+</span>
                      </div>
                      <p className="text-[#6147AA] font-medium">
                        {budgets.length > 3
                          ? "View All Budgets"
                          : "Add New Budget"}
                      </p>
                    </div>
                  </div>
                )} */}
              </>
            )}
          </div>
        </div>

        {/* Recent Expenses Summary */}
        <div className="mb-4">
          <h2 className="mb-4">Recent Expenses</h2>
          <div className="overflow-x-auto">
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
                {expenses &&
                  expenses.map((expense) => (
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
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
