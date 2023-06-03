import { Button, FormControl, FormControlLabel, Icon, MenuItem, Radio, RadioGroup, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';
import { getPreferredLanguage, getPreferredThemeMode, getUserId, getUsername } from '../../pages/Login/selectors';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useTranslation } from 'react-i18next';
import { Languages, ThemeModes } from '../../entities/common';
import i18n from '../../i18n';
import { logoutTrigger, updatePreferredLanguage, updatePreferredThemeMode } from '../../pages/Login/LoginSlice';
import paths from '../../common/paths';
import { Link } from 'react-router-dom';
import clsx from 'clsx';


const useStyles = makeStyles()((theme) => ({
    profileContainer: {
        display: 'inline',
        position: 'relative',
    },
    profileIcon: {
        marginRight: '10px',
    },
    navbarButton: {
        '&:hover': {
            border: '1px solid white',
        },
        color: 'white',
    },
    menuItem: {
        backgroundColor: theme.palette.grey[100],
        '&:hover': {
            backgroundColor: theme.palette.grey[200],
        }
    },
    radioGroup: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
    },
    radioGroupMarginTop: {
        marginTop: '16px',
    },
    hideMenu: {
        display: 'none'
    },
    menu: {
        position: 'absolute',
        right: '50%',
        transform: 'translateX(50%)',
        color: 'black',
    }
}));

const Profile = () => {
    const [open, setOpen] = useState(false);
    const username = useSelector(getUsername);
    const userId = useSelector(getUserId);
    const preferredLanguage = useSelector(getPreferredLanguage);
    const preferredThemeMode = useSelector(getPreferredThemeMode);
    const { classes } = useStyles();
    const dispatch = useDispatch();
    const { t } = useTranslation('common');


    const handleMouseOver = () => {
        setOpen(true);
    }

    const handleMouseLeave = () => {
        setOpen(false);
    }


    const handleLanguageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        dispatch(updatePreferredLanguage(value));
        i18n.changeLanguage(value);
    }

    const handleThemeModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        dispatch(updatePreferredThemeMode(value));
    }

    const handleLogout = () => {
        dispatch(logoutTrigger());
    }

    return (
        <div className={classes.profileContainer} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
            <Link to={`${paths.profile}/${userId}`}>
                <Button
                    variant='outlined'
                    className={classes.navbarButton}
                >
                    <Icon component={AccountCircleIcon} className={classes.profileIcon} />
                    {username}
                </Button>
            </Link>
            <div className={clsx({ [classes.menu]: true, [classes.hideMenu]: !open })}>
                <MenuItem className={clsx(classes.radioGroup, classes.menuItem, classes.radioGroupMarginTop)}>
                    <Typography>{t('navbar.changeLanguage')}</Typography>
                    <FormControl>
                        <RadioGroup
                            defaultValue={preferredLanguage}
                            onChange={handleLanguageChange}
                        >
                            <FormControlLabel value={Languages.en} control={<Radio />} label={t('languages.en')} />
                            <FormControlLabel value={Languages.ro} control={<Radio />} label={t('languages.ro')} />
                        </RadioGroup>
                    </FormControl>
                </MenuItem>
                <MenuItem className={clsx(classes.radioGroup, classes.menuItem)}>
                    <Typography>{t('navbar.themeMode')}</Typography>
                    <FormControl>
                        <RadioGroup
                            defaultValue={preferredThemeMode}
                            onChange={handleThemeModeChange}
                        >
                            <FormControlLabel value={ThemeModes.light} control={<Radio />} label={t('themeModes.light')} />
                            <FormControlLabel value={ThemeModes.dark} control={<Radio />} label={t('themeModes.dark')} />
                        </RadioGroup>
                    </FormControl>
                </MenuItem>
                <MenuItem onClick={handleLogout} className={classes.menuItem}>{t('navbar.logout')}</MenuItem>
            </div>
        </div >
    );
}

export default Profile;
