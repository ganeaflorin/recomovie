import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { makeStyles } from 'tss-react/mui';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CenterContainer from '../CenterContainer';

const useStyles = makeStyles()((theme) => ({
    loadingText: {
        marginTop: '10px',
    }
}));

const Loader = ({ condition, children }: { condition: boolean, children: React.ReactNode }) => {
    const { classes } = useStyles();
    const { t } = useTranslation('common');

    return (
        <>
            {condition ?
                <CenterContainer>
                    <CircularProgress size={100} />
                    <Typography className={classes.loadingText}>{t('loading')}</Typography>
                </CenterContainer> : children
            }
        </>
    )
}

export default Loader;