import { Routes, Route, useLocation } from "react-router-dom";
// ... rest of the code remains the same

//pages
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import BudgetPage from "./pages/BudgetPage";
import BudgetItemPage from "./pages/BudgetItemPage";
import ExpensesPage from "./pages/ExpensesPage";
import IncomePage from "./pages/IncomePage";
import InvestmentPage from "./pages/InvestmentPage";
import NotFound from "./pages/NotFoundPage";

//components
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

function App() {
  const location = useLocation();

  const isAuthRoute =
    location.pathname === "/signup" || location.pathname === "/login";

  return (
    <>

 

      {!isAuthRoute && <Header />}
      {!isAuthRoute && <Sidebar />}
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/budget" element={<BudgetPage />} />
        <Route path="/budgetitem" element={<BudgetItemPage />} />
        <Route path="/expenses" element={<ExpensesPage />} />
        <Route path="/income" element={<IncomePage />} />
        <Route path="/investment" element={<InvestmentPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </>
  );
}

export default App;
