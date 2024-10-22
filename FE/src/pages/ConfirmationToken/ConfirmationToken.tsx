import React, { useEffect } from 'react'
import { confirmationTokenTrigger } from './ConfirmationTokenSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getConfirmationStatus, getConfirmationTokenIsLoading } from './selectors';
import Loader from '../../components/Loader';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { makeStyles } from 'tss-react/mui';
import { ConfirmationTokenStatuses } from '../../entities/signUp';
import { Link } from 'react-router-dom';
import paths from '../../common/paths';

const useStyles = makeStyles()((theme) => ({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: '200px',
    },
}));

const ConfirmationToken = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getConfirmationTokenIsLoading);
    const confirmationStatus = useSelector(getConfirmationStatus);
    const { t } = useTranslation('confirmationToken');
    const { classes } = useStyles();

    const queryParameters = new URLSearchParams(window.location.search);
    const token = queryParameters.get("token");
    const payload = { token };

    useEffect(() => {
        dispatch(confirmationTokenTrigger(payload));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return (
        <Loader condition={isLoading}>
            <div className={classes.container}>
                <Typography variant="h5">{t(`confirmationStatus.${confirmationStatus}`)}</Typography>
                {confirmationStatus === ConfirmationTokenStatuses.EMAIL_CONFIRMED_SUCCESS &&
                    <Link to={paths.login}>
                        <Typography variant="h5">
                            {t('login')}
                        </Typography>
                    </Link>
                }
            </div>
        </Loader>
    )
}

export default ConfirmationToken;
