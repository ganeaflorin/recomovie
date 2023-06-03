import { Typography, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { t } from 'i18next';
import React from 'react'
import { Languages, ThemeModes } from '../../entities/common';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { getPreferredThemeMode } from '../../pages/Login/selectors';
import { makeStyles } from 'tss-react/mui';
import { updatePreferredThemeMode } from '../../pages/Login/LoginSlice';

const useStyles = makeStyles()((theme) => ({
    changeLanguageContainer: {
        margin: '30px 0 16px 16px',
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

const DrawerChangeThemeMode = () => {
    const { t } = useTranslation('common');
    const preferredThemeMode = useSelector(getPreferredThemeMode);
    const { classes } = useStyles();
    const dispatch = useDispatch();


    const handleThemeModeChange = (e: any) => {
        const { value } = e.target;
        dispatch(updatePreferredThemeMode(value));
    }

    return (
        <div className={classes.changeLanguageContainer}>
            <Typography className={classes.changeLanguageLabel}>{t('navbar.themeMode')}</Typography>
            <FormControl className={classes.changeLanguage}>
                <RadioGroup
                    defaultValue={preferredThemeMode}
                    onChange={handleThemeModeChange}
                >
                    <FormControlLabel value={ThemeModes.light} control={<Radio />} label={t('themeModes.light')} />
                    <FormControlLabel value={ThemeModes.dark} control={<Radio />} label={t('themeModes.dark')} />
                </RadioGroup>
            </FormControl>
        </div>
    )
}

export default DrawerChangeThemeMode;