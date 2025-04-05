import { useState } from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Sidebar = (props) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useUser();

  return (
    <>
      {!isOpen && (
        <div
          className="cursor-pointer "
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute h-8 w-8 top-4 right-4 md:hidden"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>
      )}

      <nav
        className={`z-20 fixed flex flex-col justify-between right-0 top-0 min-w-[75%] h-screen bg-secondary p-4 shadow-2xl backdrop-blur-lg ${
          !isOpen && "translate-x-full"
        } transition-all duration-200 md:hidden`}
      >
        <div
          className="absolute top-2 right-4  cursor-pointer text-3xl"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          &times;
        </div>

        <div className="">
          <h2 className="pl-2 mb-4 text-xl font-bold">Budget Wingman</h2>
          <div>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `sidebar-option ${isActive ? "sidebar-option-active" : ""}`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/income"
              className={({ isActive }) =>
                `sidebar-option ${isActive ? "sidebar-option-active" : ""}`
              }
            >
              Incomes
            </NavLink>
            <NavLink
              to="/budget"
              className={({ isActive }) =>
                `sidebar-option ${isActive ? "sidebar-option-active" : ""}`
              }
            >
              Budgets
            </NavLink>
            <NavLink
              to="/investment"
              className={({ isActive }) =>
                `sidebar-option  ${isActive ? "sidebar-option-active" : ""}`
              }
            >
              Investments
            </NavLink>
            <NavLink
              to="/expenses"
              className={({ isActive }) =>
                `sidebar-option ${isActive ? "sidebar-option-active" : ""}`
              }
            >
              Expenses
            </NavLink>
          </div>
        </div>
        <div
          className="sidebar-option w-full bg-white mt-4 rounded-lg"
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          Logout
        </div>
      </nav>

      {/* nav desktop */}
      <nav
        className={`hidden  z-20 fixed  flex-col justify-between left-0 top-0 min-w-60 h-screen bg-secondary p-4 shadow-2xl backdrop-blur-lg md:block md:flex`}
      >
        <div className="">
          <h2 className="pl-2 mb-4 text-xl font-bold">Budget Wingman</h2>
          <div>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `sidebar-option ${isActive ? "sidebar-option-active" : ""}`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/income"
              className={({ isActive }) =>
                `sidebar-option ${isActive ? "sidebar-option-active" : ""}`
              }
            >
              Incomes
            </NavLink>
            <NavLink
              to="/budget"
              className={({ isActive }) =>
                `sidebar-option ${isActive ? "sidebar-option-active" : ""}`
              }
            >
              Budgets
            </NavLink>
            <NavLink
              to="/investment"
              className={({ isActive }) =>
                `sidebar-option  ${isActive ? "sidebar-option-active" : ""}`
              }
            >
              Investments
            </NavLink>
            <NavLink
              to="/expenses"
              className={({ isActive }) =>
                `sidebar-option ${isActive ? "sidebar-option-active" : ""}`
              }
            >
              Expenses
            </NavLink>
            <NavLink
              to="/set-goals"
              className={({ isActive }) =>
                `sidebar-option ${isActive ? "sidebar-option-active" : ""}`
              }
            >
              Set Goals
            </NavLink>
          </div>
        </div>
        <div
          className="sidebar-option w-full bg-white mt-4 rounded-lg"
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          Logout
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
