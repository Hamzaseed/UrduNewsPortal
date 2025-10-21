import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "../../Context/AuthContext";
const ProtectedRoute = ({ children, adminOnly = false}) => {
  
  
  
  
const {user} = useContext(AuthContext)



  if (!user) {
    // Not logged in
    return <Navigate to="/" replace />;
  }

  if (adminOnly && user.role !== "admin") {
    // Logged in but not authorized
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
