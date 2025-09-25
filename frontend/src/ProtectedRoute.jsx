import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { user } = useSelector((state) => state.auth); // adjust path based on your store

  return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
