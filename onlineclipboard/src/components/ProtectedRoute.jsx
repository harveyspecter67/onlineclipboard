import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/userContext'; // Adjust path if needed

// This component acts as a wrapper for routes that require authentication.
export default function ProtectedRoute({ children }) {
    const { user } = useContext(UserContext); // Get user state from context

    if (!user) {
        // If no user is logged in, redirect them to the login page
        return <Navigate to="/login" replace />;
    }

    // If user is logged in, render the child components (the protected route)
    return children;
}
