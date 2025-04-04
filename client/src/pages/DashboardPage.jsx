import { useUser } from "../context/UserContext";
import ExpensesBarChart from "../components/dashboard/ExpensesBarChart";
import BalanceLineChart from "../components/dashboard/BalanceLineChart";

const DashboardPage = (props) => {
  const { user } = useUser();
  const currentUser = user.user;

  console.log("Current User:", currentUser);
  return (
    <>
      <div className="md:ml-64">
        {/* dashboard greetings */}
        <div className="mb-4">
          <h1 className="">Hi, {currentUser.firstName}</h1>
          <p>Here's what happening to your finances👋</p>
        </div>
        {/* dashboard AI insight */}
        <div className="h-40 border-2 mb-4 border-primary rounded-lg"></div>
        {/* dashboard summary */}
        <div className="flex gap-4">
          <div className="dashboard-summary">
            <p className="title">Total Budget: $10k</p>
          </div>
          <div className="dashboard-summary">
            <p className="title">Total Expenses: $10k</p>
          </div>
          <div className="dashboard-summary">
            <p className="title">Total Savings: $10k</p>
          </div>
        </div>
        {/* dashboard charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 mb-4">
          <div className=" border-2 border-primary rounded-lg p-4">
            <p className="title">Expenses Last 7 days</p>
            <ExpensesBarChart />
          </div>
          <div className=" border-2 border-primary rounded-lg p-4">
            <p className="title">Balance for months</p>
            <BalanceLineChart />
          </div>
        </div>
        {/* data chart of incomes and expenses and current balance */}
        <div className="flex gap-4 mb-4">
          <div className="dashboard-summary h-32 justify-start items-start">
            <p className="title">Total Budget: $10k</p>
          </div>
          <div className="dashboard-summary h-32 justify-start items-start">
            <p className="title">Income</p>
          </div>
          <div className="dashboard-summary h-32 justify-start items-start">
            <p className="title">Expenses</p>
          </div>
        </div>
        {/* user budgets */}
        <div className="mb-4">
          <h2 className="mb-4">Budgets</h2>
          <div className="flex flex-wrap gap-4">
            <div className="border-2 border-primary rounded-lg p-2 flex-grow justify-start items-start min-w-80 ">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-12 h-12 rounded-full border-2 border-primary"></div>
                  <p className="title">Groceries</p>
                </div>
                <div className="relative w-full h-2 bg-gray-200 rounded-lg">
                  <div
                    className="absolute top-0 left-0 h-full bg-primary rounded-lg"
                    style={{ width: "32%" }} // Replace with dynamic value if needed
                  ></div>
                </div>
              </div>
            </div>
            <div className="border-2 border-primary rounded-lg p-2 flex-grow justify-start items-start min-w-80">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-12 h-12 rounded-full border-2 border-primary"></div>
                  <p className="title">Groceries</p>
                </div>
                <div className="relative w-full h-2 bg-gray-200 rounded-lg">
                  <div
                    className="absolute top-0 left-0 h-full bg-primary rounded-lg"
                    style={{ width: "82%" }} // Replace with dynamic value if needed
                  ></div>
                </div>
              </div>
            </div>
            <div className="border-2 border-primary rounded-lg p-2 flex-grow justify-start items-start min-w-80">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-12 h-12 rounded-full border-2 border-primary"></div>
                  <p className="title">Groceries</p>
                </div>
                <div className="relative w-full h-2 bg-gray-200 rounded-lg">
                  <div
                    className="absolute top-0 left-0 h-full bg-primary rounded-lg"
                    style={{ width: "12%" }} // Replace with dynamic value if needed
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* recent expenses summary */}
        <div className="mb-4">
          <h2 className="mb-4">Recent Expenses</h2>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-primary text-white ">
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
