import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import Footer from '../Footer';
import Navbar from '../Navbar';
import { makeStyles } from 'tss-react/mui';
import ProtectedPath from './ProtectedPath';

const useStyles = makeStyles()((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        minHeight: 'calc(100vh - 132px)',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    }
}));

const Layout = () => {
    const { classes } = useStyles();

    return (
        <div className={classes.root}>
            <Navbar />
            <div className={classes.content}>
                <ProtectedPath>
                    <Outlet />
                </ProtectedPath>
            </div>
            <Footer />
        </div>
    )
}
export default Layout;
