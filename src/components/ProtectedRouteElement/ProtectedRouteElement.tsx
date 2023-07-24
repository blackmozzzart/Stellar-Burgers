import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../services/store';

interface ProtectedRouteElementProps {
    element: ReactElement;
}

export const ProtectedRouteElement: React.FC<ProtectedRouteElementProps> = ({ element }) => {
    const isLogged = useAppSelector((store) => store.user.isLoggedIn)

    return isLogged ? element : <Navigate to='/login' replace />
}