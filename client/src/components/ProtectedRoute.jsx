import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const ProtectedRoute = ({ children, requiredRoles }) => {
    const { user, loading } = useUser();

    if (loading) {
        return null;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (requiredRoles && !requiredRoles.includes(user.role)) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;