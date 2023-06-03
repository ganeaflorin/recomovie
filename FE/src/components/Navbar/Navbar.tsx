import { Button, Drawer, Icon } from '@mui/material';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import paths from '../../common/paths';
import { makeStyles } from 'tss-react/mui';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getIsAuthenticated, getUserId, getUsername } from '../../pages/Login/selectors';
import Profile from './Profile';
import UserSearch from '../UserSearch';
import recomovie_logo from '../../recomovie_logo.png';
import MenuIcon from '@mui/icons-material/Menu';
import { logoutTrigger } from '../../pages/Login/LoginSlice';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DrawerChangeLanguage from './DrawerChangeLanguage';
import DrawerChangeThemeMode from './DrawerChangeThemeMode';

const useStyles = makeStyles()((theme) => ({
    container: {
        height: '80px',
        display: 'flex',
        backgroundColor: theme.palette.primary.main,
        boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
        alignItems: 'center',
        position: 'sticky',
        justifyContent: 'space-between',
        padding: '0 30px',
        [theme.breakpoints.down('sm')]: {
            padding: '0 10px',

        }
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
    logo: {
        height: 'auto',
        width: '100%',
        maxWidth: '150px',
    },
    logoButton: {
        width: 'auto',
        padding: 0,
        border: 0
    },
    buttonsContainer: {
        [theme.breakpoints.down(1300)]: {
            display: 'none',
        }
    },
    menuIcon: {
        display: 'none',
        color: 'white',

        [theme.breakpoints.down(1300)]: {
            display: 'block',
        }
    },
    drawerContentContainer: {
        backgroundColor: theme.palette.primary.main,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    drawerButton: {
        marginTop: '16px',
        width: '200px',
        color: 'white',
        justifyContent: 'flex-start',
    },
    profileIcon: {
        marginLeft: '16px'
    },
    userPreferences: {
        marginTop: 'auto'
    }
}));

const Navbar = () => {
    const { classes } = useStyles();
    const { t } = useTranslation('common');
    const isAuthenticated = useSelector(getIsAuthenticated);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const username = useSelector(getUsername);
    const userId = useSelector(getUserId);

    const handleLogout = () => {
        dispatch(logoutTrigger());
        setOpen(false);
    }

    const toggleDrawer = (open: boolean) => (event: any) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setOpen(open);
    };

    return (
        <div className={classes.container}>
            <Button className={classes.logoButton}>
                <Link to={paths.home} className={classes.link}>
                    <img className={classes.logo} src={recomovie_logo} alt="logo" />
                </Link>
            </Button>
            <UserSearch />
            <div className={classes.buttonsContainer}>
                <Button variant="outlined" className={classes.button}>
                    <Link to={paths.home} className={classes.link}>{t('navbar.home')}</Link>
                </Button>
                <Button variant="outlined" className={classes.button}>
                    <Link to={paths.recommendations} className={classes.link}>{t('navbar.recommendations')}</Link>
                </Button>
                <Button variant="outlined" className={classes.button}>
                    <Link to={paths.playlists} className={classes.link}>{t('navbar.playlists')}</Link>
                </Button>
                <Button variant="outlined" className={classes.button}>
                    <Link to={paths.myFriends} className={classes.link}>{t('navbar.friends')}</Link>
                </Button>
                {!isAuthenticated && <Button variant="outlined" className={classes.button}>
                    <Link to={paths.login} className={classes.link}>{t('navbar.login')}</Link>
                </Button>
                }
                {isAuthenticated && <Profile />}
            </div>
            <Button className={classes.menuIcon} onClick={() => setOpen(true)}>
                <MenuIcon />
            </Button>
            <Drawer
                anchor="right"
                open={open}
                onClose={toggleDrawer(false)}
            >
                <div className={classes.drawerContentContainer}>

                    <Button variant="outlined" className={classes.drawerButton}>
                        <Link to={paths.home} className={classes.link}>{t('navbar.home')}</Link>
                    </Button>
                    <Button variant="outlined" className={classes.drawerButton}>
                        <Link to={paths.recommendations} className={classes.link}>{t('navbar.recommendations')}</Link>
                    </Button>
                    <Button variant="outlined" className={classes.drawerButton}>
                        <Link to={paths.playlists} className={classes.link}>{t('navbar.playlists')}</Link>
                    </Button>
                    <Button variant="outlined" className={classes.drawerButton}>
                        <Link to={paths.myFriends} className={classes.link}>{t('navbar.friends')}</Link>
                    </Button>
                    {!isAuthenticated && <Button variant="outlined" className={classes.drawerButton}>
                        <Link to={paths.login} className={classes.link}>{t('navbar.login')}</Link>
                    </Button>
                    }
                    {isAuthenticated &&
                        <>
                            <Link to={`${paths.profile}/${userId}`} className={classes.link}>
                                <Button
                                    variant='outlined'
                                    className={classes.drawerButton}
                                >
                                    {username}
                                    <Icon component={AccountCircleIcon} className={classes.profileIcon} />
                                </Button>
                            </Link>
                            <Button onClick={handleLogout} variant="outlined" className={classes.drawerButton}>{t('navbar.logout')}</Button>
                        </>
                    }
                    <div className={classes.userPreferences}>
                        <DrawerChangeLanguage />
                        <DrawerChangeThemeMode />
                    </div>
                </div>
            </Drawer>
        </div>
    )
}

export default Navbar;
