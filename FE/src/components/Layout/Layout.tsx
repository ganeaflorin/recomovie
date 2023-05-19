import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import Footer from '../Footer';
import Navbar from '../Navbar';
import { makeStyles } from 'tss-react/mui';
import { useSelector } from 'react-redux';
import { getIsAuthenticated } from '../../pages/Login/selectors';
import paths from '../../common/paths';

const useStyles = makeStyles()((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        minHeight: 'calc(100vh - 122px)',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    }
}));

const Layout = ({ isAuthRequired }: any) => {
    const { classes } = useStyles();
    const isAuthenticated = useSelector(getIsAuthenticated);
    console.log("🚀 ~ file: Layout.tsx:26 ~ Layout ~ isAuthenticated:", isAuthenticated)
    console.log("🚀 ~ file: Layout.tsx:24 ~ Layout ~ isAuthRequired:", isAuthRequired)

    return (
        <div className={classes.root}>
            <Navbar />
            <div className={classes.content}>
                {/* {isAuthRequired && isAuthenticated === true ? <Outlet /> : <Navigate to={paths.login} />} */}
                {!isAuthRequired && <Outlet />}
            </div>
            <Footer />
        </div>
    )
}
export default Layout;
