import Sidebar from "../components/Sidebar";
import { useState } from "react";

const LoginPage = () => {
  const [agreed, setAgreed] = useState(false);

  return (
    <>
      <Sidebar />
      <div className="flex justify-center mt-8">
        <form className="w-full max-w-sm space-y-4 p-6 bg-gray-50 rounded-lg border-2 border-purple-800">
          {/* Heading inside form */}
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold text-gray-800">Welcome Back!</h1>
            <p className="text-gray-600">Let’s take control of your budget today</p>
          </div>
          {/* Email */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full h-10 px-3 rounded-lg border-2 border-purple-800 outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full h-10 px-3 rounded-lg border-2 border-purple-800 outline-none focus:ring-2 focus:ring-purple-500 -mb-2"
            />
          </div>
          <p className="text-gray-600 text-right">Forgot Password?</p>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-800 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
          >
            Log In
          </button>
            {/* Already have an account */}
            <div className="flex justify-center mt-4">
                <p className="text-gray-600">Already have an account?</p>
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