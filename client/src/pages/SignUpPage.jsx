import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const SignUpPage = () => {
  const [agreed, setAgreed] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);

    if (!agreed) {
      alert("Please agree to the terms and conditions.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/auth/signup`,
        formData
      );
      console.log("Response from server:", response);
      if (response.status === 200) {
        navigate("/login");
      } else {
        alert("Signup failed. Please try again.");
      }
    } catch (e) {
      console.error("Error during signup:", e);
    }
  };

  return (
    <>
      <div className="flex justify-center mt-8">
        <form
          className="w-full max-w-sm space-y-4 p-6 bg-gray-50 rounded-lg border-2 border-purple-800"
          onSubmit={handleSubmit}
        >
          {/* Heading inside form */}
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold text-gray-800">
              Create your account
            </h1>
            <p className="text-gray-600">Join BudgetApp now!</p>
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            <input
              type="text"
              placeholder="Enter your first name"
              onChange={handleChange}
              value={formData.firstName}
              name="firstName"
              className="w-full h-10 px-3 rounded-lg border-2 border-purple-800 outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Enter your last name"
              onChange={handleChange}
              value={formData.lastName}
              name="lastName"
              className="w-full h-10 px-3 rounded-lg border-2 border-purple-800 outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              onChange={handleChange}
              value={formData.email}
              name="email"
              className="w-full h-10 px-3 rounded-lg border-2 border-purple-800 outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              onChange={handleChange}
              value={formData.password}
              name="password"
              className="w-full h-10 px-3 rounded-lg border-2 border-purple-800 outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              value={agreed}
              className="h-4 w-4 text-purple-600 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 flex flex-wrap">
              <span className="text-slate-600 text-xs leading-tight mr-1">
                By creating an account means you agree to the
              </span>
              <span className="text-slate-600 text-xs font-bold leading-tight">
                Terms and Conditions
              </span>
              <span className="text-slate-600 text-xs leading-tight mr-1">
                , and our
              </span>
              <span className="text-slate-600 text-xs font-bold leading-tight">
                Privacy Policy
              </span>
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-800 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
          >
            Sign Up
          </button>
          {/* Already have an account */}
          <div className="flex justify-center mt-4">
            <p className="text-gray-600">Already have an account?</p>
            <a href="/login" className="text-purple-800 font-semibold ml-1">
              Log In
            </a>
          </div>
        </form>
      </div>
    </>
  );
};
export default SignUpPage;
