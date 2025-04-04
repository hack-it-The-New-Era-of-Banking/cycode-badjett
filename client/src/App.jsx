import { Routes, Route, useLocation } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
// import { useUser } from "./contexts/UserContext";

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

//utils
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  // const user = useUser();
  const location = useLocation();

  const isAuthRoute =
    location.pathname === "/signup" || location.pathname === "/login";

  return (
    <UserProvider>
      {/* Wrap the app with UserProvider */}
      {!isAuthRoute && <Header />}
      {!isAuthRoute && <Sidebar />}
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />

     

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/budget"
          element={
            <ProtectedRoute>
              <BudgetPage />
            </ProtectedRoute>
          }
        />
        <Route path="/budgetitem" element={<BudgetItemPage />} />
        <Route
          path="/expenses"
          element={
            <ProtectedRoute>
              <ExpensesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/income"
          element={
            <ProtectedRoute>
              <IncomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/investment"
          element={
            <ProtectedRoute>
              <InvestmentPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
