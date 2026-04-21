import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const userData = localStorage.getItem("userData");

  // Allow if userData exists in localStorage OR location.state has userData (for OTP page)
  const fromLogin = location.state?.userData;

  if (!userData && !fromLogin) {
    return <Navigate to="/pentionId" replace />;
  }

  return children;
};

export default ProtectedRoute;
