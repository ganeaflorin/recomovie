import { Button, FormControl, FormControlLabel, Icon, Menu, MenuItem, Radio, RadioGroup, Typography } from '@mui/material';
import React, { useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';
import { getPreferredLanguage, getUsername } from '../../pages/Login/selectors';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useTranslation } from 'react-i18next';
import { Languages } from '../../entities/common';
import i18n from '../../i18n';
import { logoutTrigger, updatePreferredLanguage } from '../../pages/Login/LoginSlice';

interface Props {
    menuItemWidth: string;
}

const useStyles = makeStyles<Props>()((theme, { menuItemWidth }) => ({
    profileContainer: {
        display: 'inline',
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
        minWidth: menuItemWidth,
    },
    menu: {
        marginTop: '12px',
    },
    changeLanguage: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start'
    }
}));

const Profile = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const username = useSelector(getUsername);
    const preferredLanguage = useSelector(getPreferredLanguage);
    const [menuItemWidth, setMenuItemWidth] = useState("");
    const { classes } = useStyles({ menuItemWidth });
    const { t } = useTranslation('common');
    const dispatch = useDispatch();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useLayoutEffect(() => {
        if (anchorEl) {
            setMenuItemWidth(window.getComputedStyle(anchorEl).width);
        }
    }, [anchorEl, menuItemWidth]);

    const handleLanguageChange = (e: any) => {
        const { value } = e.target;
        dispatch(updatePreferredLanguage(value));
        i18n.changeLanguage(value);
    }

    const handleLogout = () => {
        // persistor.purge();
        dispatch(logoutTrigger());
        handleClose();
    }

    return (
        <div className={classes.profileContainer}>
            <Button
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                variant='outlined'
                className={classes.navbarButton}
            >
                <Icon component={AccountCircleIcon} className={classes.profileIcon} />
                {username}
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                className={classes.menu}
            >
                <MenuItem className={classes.changeLanguage}>
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
                <MenuItem className={classes.menuItem} onClick={handleLogout}>{t('navbar.logout')}</MenuItem>
            </Menu>
        </div>
    );
}

export default Profile;
