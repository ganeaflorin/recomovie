import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { getIsAuthenticated } from '../../pages/Login/selectors';
import paths, { unprotectedPaths } from '../../common/paths';
import { useNavigate } from 'react-router-dom';

const ProtectedPath = ({ children }: { children: React.ReactNode }) => {
    const path = window.location.pathname;
    const isAuthenticated = useSelector(getIsAuthenticated);
    const navigate = useNavigate();

    useEffect(() => {
        if ((unprotectedPaths.includes(path) && isAuthenticated) || path === paths.root) {
            navigate(paths.home);
        }
        if (!unprotectedPaths.includes(path) && !isAuthenticated) {
            navigate(paths.forbidden);
        }
    }, [path, navigate, isAuthenticated])

    return (
        <>
            {children}
        </>
    )
}

export default ProtectedPath;
