import { useState } from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";

const Sidebar = (props) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {!isOpen && (
        // <div className="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute h-8 w-8 top-4 right-4 md:hidden"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        // </div>
      )}

      <nav
        className={`z-20 fixed flex flex-col justify-between right-0 min-w-[75%] h-screen bg-secondary p-4 shadow-2xl backdrop-blur-lg ${
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

        <div className="relative">
          <h2 className="pl-2 mb-4 text-xl font-bold">Budget App</h2>
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
              to="/"
              className={({ isActive }) =>
                `sidebar-option ${isActive ? "sidebar-option-active" : ""}`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `sidebar-option ${isActive ? "sidebar-option-active" : ""}`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `sidebar-option  ${isActive ? "sidebar-option-active" : ""}`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `sidebar-option ${isActive ? "sidebar-option-active" : ""}`
              }
            >
              Dashboard
            </NavLink>
          </div>
        </div>
        {/* <button
          className="sidebar-option w-full bg-[#f4c5cc]"
          onClick={() => {
            user.logout();
            navigate("/register");
          }}
        >
          Logout
        </button> */}
      </nav>
    </>
  );
};

export default Sidebar;
