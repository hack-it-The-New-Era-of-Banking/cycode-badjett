import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import ExpensesBarChart from "../components/dashboard/ExpensesBarChart";
import BalanceLineChart from "../components/dashboard/BalanceLineChart";
import axios from "axios";

const DashboardPage = (props) => {
  const { user, token } = useUser();
  const currentUser = user.user;

  const [budgets, setBudgets] = useState([]); // State to store fetched budgets
  const [totalBudget, setTotalBudget] = useState(0); // State to store the total budget

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

        // Calculate the total budget
        const total = response.data.reduce(
          (sum, budget) => sum + (budget.budget || 0),
          0
        );
        setTotalBudget(total); // Update the total budget state
      } catch (error) {
        console.error("Error fetching budgets:", error);
        alert("Failed to fetch budgets. Please try again.");
      }
    };

    fetchBudgets();
  }, [currentUser._id, token]); // Run the effect when the user ID or token changes

  return (
    <>
      <div className="md:ml-64">
        {/* Dashboard Greetings */}
        <div className="mb-4">
          <h1 className="">Hi, {currentUser.firstName}</h1>
          <p>Here's what happening to your finances👋</p>
        </div>
        {/* Dashboard AI Insight */}
        <div className="h-40 border-2 mb-4 border-primary rounded-lg"></div>
        {/* Dashboard Summary */}
        <div className="flex gap-4">
          <div className="dashboard-summary">
            <p className="title">
              Total Budget: ₱{totalBudget.toLocaleString()}
            </p>
          </div>
          <div className="dashboard-summary">
            <p className="title">Total Expenses: $10k</p>
          </div>
          <div className="dashboard-summary">
            <p className="title">Total Savings: $10k</p>
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
        {/* User Budgets */}
        <div className="mb-4">
          <h2 className="mb-4">Budgets</h2>
          <div className="flex flex-wrap gap-4">
            {budgets.map((budget) => {
              // Calculate the total spent by summing up itemPrice in categoryItems
              const totalSpent = budget.categoryItems.reduce(
                (sum, item) => sum + (item.itemPrice || 0),
                0
              );

              return (
                <div
                  key={budget._id}
                  className="border-2 border-primary rounded-lg p-2 flex-grow justify-start items-start min-w-80"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-12 h-12 bg-[#D9D9D9] border-2 border-[#6147AA] rounded-full flex items-center justify-center mr-[15px]">
                        <span role="img" aria-label="icon">
                          📊
                        </span>
                      </div>
                      <p className="title">
                        {budget.category || "No Category"}
                      </p>
                    </div>
                    <div className="relative w-full h-2 bg-gray-200 rounded-lg">
                      <div
                        className="absolute top-0 left-0 h-full bg-primary rounded-lg"
                        style={{
                          width: `${
                            (totalSpent / (budget.budget || 1)) * 100
                          }%`, // Calculate percentage spent
                        }}
                      ></div>
                    </div>
                    <p className="text-sm mt-2">
                      ₱{totalSpent.toLocaleString()} spent of ₱
                      {(budget.budget || 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            })}
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
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Coffee</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Starbucks
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    2023-03-01
                  </td>
                  <td className="border border-gray-300 px-4 py-2">$5.00</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button className="text-primary">Edit</button>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">
                    Groceries
                  </td>
                  <td className="border border-gray-300 px-4 py-2">Walmart</td>
                  <td className="border border-gray-300 px-4 py-2">
                    2023-03-02
                  </td>
                  <td className="border border-gray-300 px-4 py-2">$50.00</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button className="text-primary">Edit</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
