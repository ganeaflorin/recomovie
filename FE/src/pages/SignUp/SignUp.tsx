import { Button, FormControl, TextField, Theme, Typography } from '@mui/material';
import React from 'react'
import { useDispatch } from 'react-redux';
import { signUpTrigger, updateField } from './SignUpSlice';
import { useTranslation } from 'react-i18next';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: '200px',
    },
    form: {
        display: 'flex',
        alignItems: 'center',
    },
    formField: {
        marginTop: '20px',
        boxSizing: 'border-box',
        width: '280px',
    },
    submitButton: {
        marginTop: '20px',
        display: 'block',
        width: '280px',

    }
}));

const SignUp = () => {
    const { t } = useTranslation('signUp');
    const { classes } = useStyles();
    const formConfig = [
        { key: 'username', label: t('username.label'), type: 'text', className: classes.formField },
        { key: 'email', label: t('email.label'), type: 'email', className: classes.formField },
        { key: 'password', label: t('password.label'), type: 'password', className: classes.formField },
        { key: 'confirmPassword', label: t('confirmPassword.label'), type: 'password', className: classes.formField }
    ];

    const dispatch = useDispatch();
    const handleSubmit = () => {
        dispatch(signUpTrigger());
    }

    return (
        <div className={classes.container}>
            <Typography variant='h4'>{t('title')}</Typography>
            <FormControl className={classes.form}>
                {formConfig.map(({ key, label, type, className }) => <TextField className={className} variant="outlined" label={label} type={type} onChange={(e) => dispatch(updateField({ [key]: e.target.value }))} />)}
                <Button variant="contained" onClick={handleSubmit} className={classes.submitButton}>{t('submitButton')}</Button>
            </FormControl>
        </div>
    )
}

export default SignUp;