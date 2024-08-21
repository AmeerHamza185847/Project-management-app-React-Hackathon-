import React from 'react';
import { Navigate } from 'react-router-dom';
import { Dashboard } from '../Dashboard/Dashboard';


export const ProtectedRoutes = ({ children, user }) => {
    return (
        <div>
            {
                (user) ? children : <Navigate to="/"></Navigate>
            }
        </div>
    )
}
