import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../services/store';

export const ProtectedRouteElement = ({ element }) => {
    const isLogged = useAppSelector((store) => store.user.isLoggedIn)

    return isLogged ? element : <Navigate to='/login' replace />
}

ProtectedRouteElement.propTypes = {
    element: PropTypes.element,
}