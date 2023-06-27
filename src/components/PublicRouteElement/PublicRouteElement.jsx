import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../services/store';

export const PublicRouteElement = ({ element }) => {
    const isLogged = useAppSelector((store) => store.user.isLoggedIn)

    return !isLogged ? element : <Navigate to='/profile' replace />
}