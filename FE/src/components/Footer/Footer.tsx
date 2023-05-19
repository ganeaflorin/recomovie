import { Typography } from '@mui/material';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { makeStyles } from 'tss-react/mui';
const useStyles = makeStyles()((theme) => ({
    container: {
        height: '60px',
        borderTop: `2px solid ${theme.palette.grey[300]}`,
        color: theme.palette.grey[500],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
}));
const Footer = () => {
    const { classes } = useStyles();
    const { t } = useTranslation('common');
    return (
        <footer className={classes.container}>
            <Typography>{t('footer')}</Typography>
        </footer>
    )
}

export default Footer;