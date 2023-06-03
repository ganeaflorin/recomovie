import { Typography, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import React from 'react'
import { Languages } from '../../entities/common';
import { useDispatch, useSelector } from 'react-redux';
import { updatePreferredLanguage } from '../../pages/Login/LoginSlice';
import { useTranslation } from 'react-i18next';
import { getPreferredLanguage } from '../../pages/Login/selectors';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
    changeLanguageContainer: {
        marginLeft: '16px',
        '*': {
            color: 'white'
        }
    },
    changeLanguage: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        color: 'white'
    },
    changeLanguageLabel: {
        color: 'white',
        textTransform: 'uppercase',
        fontSize: '14px',
        fontWeight: 500,
    },
}));

const DrawerChangeLanguage = () => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation('common');
    const preferredLanguage = useSelector(getPreferredLanguage);
    const { classes } = useStyles();

    const handleLanguageChange = (e: any) => {
        const { value } = e.target;
        dispatch(updatePreferredLanguage(value));
        i18n.changeLanguage(value);
    }

    return (
        <div className={classes.changeLanguageContainer}>
            <Typography className={classes.changeLanguageLabel}>{t('navbar.changeLanguage')}</Typography>
            <FormControl className={classes.changeLanguage}>
                <RadioGroup
                    defaultValue={preferredLanguage}
                    onChange={handleLanguageChange}
                >
                    <FormControlLabel value={Languages.en} control={<Radio />} label={t('languages.en')} />
                    <FormControlLabel value={Languages.ro} control={<Radio />} label={t('languages.ro')} />
                </RadioGroup>
            </FormControl>
        </div>
    )
}

export default DrawerChangeLanguage;
