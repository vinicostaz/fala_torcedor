import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');
  if (!token) return <Navigate to="/login" />;
  const { expiry } = JSON.parse(token);
  if (new Date().getTime() > expiry) {
    localStorage.removeItem('authToken');
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;