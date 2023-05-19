import { AppBar, Button } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';
import paths from '../../common/paths';
import { makeStyles } from 'tss-react/mui';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getIsAuthenticated } from '../../pages/Login/selectors';
import Profile from './Profile';

const useStyles = makeStyles()((theme) => ({
    container: {
        height: '60px',
        justifyContent: 'center',
        alignItems: 'end',
        position: 'sticky',
    },
    button: {
        width: 'auto',
        marginRight: '20px',
        '&:hover': {
            border: '1px solid white',
        }
    },
    link: {
        textDecoration: 'none',
        color: 'white',
    },
    buttonsContainer: {
        marginRight: '30px',
    }
}));

const Navbar = () => {
    const { classes } = useStyles();
    const { t } = useTranslation('common');
    const isAuthenticated = useSelector(getIsAuthenticated);


    return (
        <AppBar className={classes.container}>
            <div className={classes.buttonsContainer}>
                <Button variant="outlined" className={classes.button}>
                    <Link to={paths.recommendations} className={classes.link}>{t('navbar.recommendations')}</Link>
                </Button>
                <Button variant="outlined" className={classes.button}>
                    <Link to={paths.myPlaylists} className={classes.link}>{t('navbar.playlists')}</Link>
                </Button>
                {!isAuthenticated && <Button variant="outlined" className={classes.button}>
                    <Link to={paths.login} className={classes.link}>{t('navbar.login')}</Link>
                </Button>
                }
                {isAuthenticated && <Profile />}
            </div>
        </AppBar>
    )
}

export default Navbar;
