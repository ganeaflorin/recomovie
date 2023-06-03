import { Button, FormControl, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { LoginFormKeys } from "../../entities/login";
import { useDispatch, useSelector } from "react-redux";
import { loginTrigger, updateField } from "./LoginSlice";
import { makeStyles } from 'tss-react/mui';
import { getIsAuthenticated, getLoginError } from "./selectors";
import CenterContainer from "../../components/CenterContainer";
import paths from "../../common/paths";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const useStyles = makeStyles()((theme) => ({
    form: {
        display: 'flex',
        alignItems: 'center',
    },
    formElement: {
        marginTop: '20px',
        width: '280px',
    },
    errorMessage: {
        marginTop: '40px',
        color: '#d32f2f',
    },
    signUpLink: {
        textDecoration: 'none',
        marginTop: '20px',
        color: theme.palette.primary.main
    }
}));

const Login = () => {
    const { t } = useTranslation('login');
    const { classes } = useStyles();
    const dispatch = useDispatch();
    const error = useSelector(getLoginError);
    const isAuthenticated = useSelector(getIsAuthenticated);
    const navigate = useNavigate();

    const formConfig = [
        { key: LoginFormKeys.username, label: t('username.label'), type: 'text', required: true, className: classes.formElement },
        { key: LoginFormKeys.password, label: t('password.label'), type: 'password', required: true, className: classes.formElement },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: LoginFormKeys) => {
        const newValue = { [key]: e.target.value }
        dispatch(updateField(newValue));
    }

    const handleSubmit = () => {
        dispatch(loginTrigger());
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate(paths.home);
        }
    }, [isAuthenticated, navigate])

    return (
        <>
            <CenterContainer>
                <Typography variant='h4'>{t('title')}</Typography>
                {error && <Typography className={classes.errorMessage}>{t(`errors.${error.message}`)}</Typography>}
                <FormControl className={classes.form}>
                    {formConfig.map(({ key, label, type, className, required }) =>
                        <TextField className={className} variant="outlined" label={label} required={required} type={type}
                            onChange={(e) => { handleChange(e, key) }} />)}
                    <Button variant="contained" type="submit" onClick={handleSubmit} className={classes.formElement}>{t('submitButton')}</Button>
                    <Link to={paths.signUp} className={classes.signUpLink}>{t('signUpLink')}</Link>
                </FormControl>
            </CenterContainer>
        </>
    )

}

export default Login;