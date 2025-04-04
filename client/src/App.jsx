import { BrowserRouter, Routes, Route } from "react-router-dom";

//pages
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
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

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>{" "}
    </>
  );
}

export default App;
