import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../services/store';

interface PublicRouteElementProps {
    element: ReactElement;
}

export const PublicRouteElement: React.FC<PublicRouteElementProps> = ({ element }) => {
    const isLogged = useAppSelector((store) => store.user.isLoggedIn)

    return !isLogged ? element : <Navigate to='/profile' replace />
}