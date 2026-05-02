import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../contexts/UserContexts';

const PrivateRoute = () => {
  const { userName } = useUser();

  if (!userName) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/login" />;
  }

  // If user is authenticated, render the child routes
  return <Outlet />;
};

export default PrivateRoute;
