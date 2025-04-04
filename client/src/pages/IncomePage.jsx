import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import IncomeLineChart from "../components/dashboard/IncomeLineChart";
import PlusSign from "../assets/icons/PlusSign.svg";
import AddIncomeModal from "../modals/AddIncomeModal"; // Import the modal
import axios from "axios";

const IncomePage = (props) => {
  const { user, token } = useUser();
  const currentUser = user.user;

  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [incomeData, setIncomeData] = useState([]); // State to store fetched income data
  const [totalIncome, setTotalIncome] = useState(0); // State to store total income

  const openModal = () => setIsModalOpen(true); // Function to open the modal
  const closeModal = () => setIsModalOpen(false); // Function to close the modal

  // Fetch income data from the API
  useEffect(() => {
    const fetchIncomeData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_URL}/income?userId=${currentUser._id}`,
          {
            headers: {
              Authorization: `${token}`, // Add the token to the Authorization header
            },
          }
        );
        console.log(response.data); // Log the fetched income data
        setIncomeData(response.data.income); // Update the income data state
        setTotalIncome(response.data.totalIncomeSum); // Set the total income from the response
      } catch (error) {
        console.error("Error fetching income data:", error);
        alert("Failed to fetch income data. Please try again.");
      }
    };

    fetchIncomeData();
  }, [currentUser._id, token]); // Run the effect when the user ID or token changes

  return (
    <>
      <div className="md:ml-64">
        <div className="mb-4">
          <h1 className="">Hi, {currentUser.firstName}</h1>
          <p>Here's the summary of your latest generated income</p>
        </div>
        <div className="flex items-center justify-between border-2 mb-4 p-4 border-primary rounded-lg">
          <div>
            <h2>
              Total Income as of{" "}
              {new Date().toLocaleString("default", { month: "long" })}
            </h2>
            <p className="text-4xl font-bold">
              ₱{totalIncome.toLocaleString()}
            </p>
          </div>
          <img
            src={PlusSign}
            alt="Plus Icon"
            onClick={openModal} // Open the modal when clicked
            className="w-6 h-6 mb-2 cursor-pointer"
          />
        </div>
        <div className="mb-4">
          <div className="border-2 border-primary rounded-lg p-4">
            <p className="title">Balance for months</p>
            <IncomeLineChart />
          </div>
        </div>
        <div>
          <div>
            <h1 className="mb-4">This Month's Income</h1>
            <div>
              {incomeData.map((income, index) => (
                <div
                  key={income._id}
                  className="flex items-center justify-between border-2 border-primary rounded-full p-2 px-4 mb-2"
                >
                  <p>
                    Generated ₱{income.totalIncome.toLocaleString()} from{" "}
                    {income.jobTitle} ({income.category})
                  </p>
                  <div className="flex items-center justify-center font-bold text-xl border-amber-400 border-2 rounded-full w-8 h-8">
                    $
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Add Income Modal */}
      {isModalOpen && <AddIncomeModal onCancel={closeModal} />}
    </>
  );
};

export default IncomePage;
