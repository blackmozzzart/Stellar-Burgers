import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../services/store';

export const PublicRouteElement = ({ element }) => {
    const isLogged = useAppSelector((store) => store.user.isLoggedIn)

    return !isLogged ? element : <Navigate to='/profile' replace />
}

PublicRouteElement.propTypes = {
    element: PropTypes.element,
}