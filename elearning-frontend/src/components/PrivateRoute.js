
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Element, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <Navigate to="/login" />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/" />;

  return <Element />;
};

export default PrivateRoute;
