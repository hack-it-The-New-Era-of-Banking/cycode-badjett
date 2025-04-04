import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/UserContext";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { login } = useUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/auth/login`,
        formData
      );
      console.log("Response from server:", response);
      if (response.status === 200) {
        // Store the token if your backend sends one
        login(response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <>
      <div className="flex justify-center mt-8">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm space-y-4 p-6 bg-gray-50 rounded-lg border-2 border-purple-800"
        >
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold text-gray-800">Welcome Back!</h1>
            <p className="text-gray-600">
              Let's take control of your budget today
            </p>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full h-10 px-3 rounded-lg border-2 border-purple-800 outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full h-10 px-3 rounded-lg border-2 border-purple-800 outline-none focus:ring-2 focus:ring-purple-500 -mb-2"
            />
          </div>

          <p className="text-gray-600 text-right">Forgot Password?</p>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-800 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
          >
            Log In
          </button>

          <div className="flex justify-center mt-4">
            <p className="text-gray-600">Don't have an account?</p>
            <a href="/signup" className="text-purple-800 font-semibold ml-1">
              Sign Up
            </a>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
