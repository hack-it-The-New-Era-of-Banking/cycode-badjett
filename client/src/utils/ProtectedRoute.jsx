import { useUser } from "../context/UserContext";
import { Navigate } from "react-router-dom";
import React from "react";

const ProtectedRoute = ({ children }) => {
  const user = useUser();

  if (!user.token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
