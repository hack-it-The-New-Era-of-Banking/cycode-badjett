import { BrowserRouter, Routes, Route } from "react-router-dom";

//pages
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import BudgetPage from "./pages/BudgetPage";
import ExpensesPage from "./pages/ExpensesPage";
import IncomePage from "./pages/IncomePage";
import InvestmentPage from "./pages/InvestmentPage";
import NotFound from "./pages/NotFoundPage";

//components
import Sidebar from "./components/Sidebar";

function App() {
  // const user = useUser();

  return (
    <>
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/budget" element={<BudgetPage />} />
          <Route path="/expenses" element={<ExpensesPage />} />
          <Route path="/income" element={<IncomePage />} />
          <Route path="/investment" element={<InvestmentPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>{" "}
    </>
  );
}

export default App;
