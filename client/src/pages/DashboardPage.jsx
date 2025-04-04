import ExpensesBarChart from "../components/dashboard/ExpensesBarChart";
import BalanceLineChart from "../components/dashboard/BalanceLineChart";

const DashboardPage = (props) => {
  return (
    <>
      <div className="md:ml-64">
        {/* dashboard greetings */}
        <div className="mb-4">
          <h1 className="">Hi, CyCode</h1>
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
        <div className="flex gap-4 ">
          <div className="dashboard-summary h-32">
            <p className="title">Total Budget: $10k</p>
          </div>
          <div className="dashboard-summary h-32">
            <p className="title">Total Expenses: $10k</p>
          </div>
          <div className="dashboard-summary h-32">
            <p className="title">Total Savings: $10k</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
