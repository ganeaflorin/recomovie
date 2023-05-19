import { Button, FormControl, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signUpTrigger, updateField } from './SignUpSlice';
import { useTranslation } from 'react-i18next';
import { makeStyles } from 'tss-react/mui';
import { SignUpErrors, SignUpFields, SignUpFormKeys, TextFieldRule, ValidationRules } from '../../entities/signUp';
import { getIsSuccessSignUp, getSignUpError, getSignUpFields, getSignUpIsLoading } from './selectors';
import regexPatterns from '../../common/regexPatterns';
import Loader from '../../components/Loader';
import CenterContainer from '../../components/CenterContainer';

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
    }
}));

const SignUp = () => {
    const { t } = useTranslation('signUp');
    const { classes } = useStyles();
    const [errors, setErrors] = useState<SignUpErrors>({});
    const dispatch = useDispatch();
    const fields = useSelector(getSignUpFields);
    const isSuccessSignUp = useSelector(getIsSuccessSignUp);
    console.log("🚀 ~ file: SignUp.tsx:35 ~ SignUp ~ isSuccessSignUp:", isSuccessSignUp)
    const isLoading = useSelector(getSignUpIsLoading);
    const error = useSelector(getSignUpError);
    const formHasError = Object.values(errors).some(value => value);
    const formConfig = [
        { key: SignUpFormKeys.username, label: t('username.label'), type: 'text', error: Boolean(errors[SignUpFormKeys.username]), helperText: errors[SignUpFormKeys.username], required: true, className: classes.formElement },
        { key: SignUpFormKeys.email, label: t('email.label'), type: 'email', error: Boolean(errors[SignUpFormKeys.email]), helperText: errors[SignUpFormKeys.email], required: true, className: classes.formElement },
        { key: SignUpFormKeys.password, label: t('password.label'), type: 'password', error: Boolean(errors[SignUpFormKeys.password]), helperText: errors[SignUpFormKeys.password], required: true, className: classes.formElement },
        { key: SignUpFormKeys.confirmPassword, label: t('confirmPassword.label'), type: 'password', error: Boolean(errors[SignUpFormKeys.confirmPassword]), helperText: errors[SignUpFormKeys.confirmPassword], required: true, className: classes.formElement }
    ];
    // required condition can potentially be removed
    const getValidationRules = (fields: SignUpFields): ValidationRules => {
        return {
            [SignUpFormKeys.username]: [{ condition: fields.username.length === 0, message: t('username.errors.required') }, { condition: fields.username.length < 3, message: t('username.errors.minLength') }],
            [SignUpFormKeys.email]: [{ condition: fields.email.length === 0, message: t('email.errors.required') }, { condition: !(new RegExp(regexPatterns.email).test(fields.email)), message: t('email.errors.regexp') }],
            [SignUpFormKeys.password]: [{ condition: fields.password.length === 0, message: t('password.errors.required') }, { condition: !(new RegExp(regexPatterns.password).test(fields.password)), message: t('password.errors.regexp') }],
            [SignUpFormKeys.confirmPassword]: [{ condition: fields.confirmPassword.length === 0, message: t('confirmPassword.errors.required') }, { condition: fields.confirmPassword !== fields.password, message: t('confirmPassword.errors.notEqual') }],
        }
    }
    const checkValidationRulesByKey = (validationRules: ValidationRules, key: SignUpFormKeys) => {
        setErrors((prevErrors) => { return { ...prevErrors, [key]: undefined } })
        validationRules[key].forEach(({ condition, message }: TextFieldRule) => {
            if (condition) {
                setErrors((prevErrors) => { return { ...prevErrors, [key]: message } })
            }
        })
    }

    const checkValidationRules = (fields: SignUpFields, key?: SignUpFormKeys) => {
        const validationRules = getValidationRules(fields);
        if (key) {
            checkValidationRulesByKey(validationRules, key);
        }
        else {
            Object.keys(validationRules).forEach((key) => {
                checkValidationRulesByKey(validationRules, key as SignUpFormKeys);
            })
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: SignUpFormKeys) => {
        const newValue = { [key]: e.target.value }
        const updatedFields = { ...fields, ...newValue }
        dispatch(updateField(newValue)); checkValidationRules(updatedFields, key)
    }

    const handleSubmit = () => {
        checkValidationRules(fields);
        if (!formHasError) {
            dispatch(signUpTrigger());
        }
    }

    return (
        <Loader condition={isLoading}>
            <CenterContainer>
                {isSuccessSignUp && <Typography>{t('confirmationToken')}</Typography>}
                {!isSuccessSignUp &&
                    <>
                        <Typography variant='h4'>{t('title')}</Typography>
                        {error && <Typography className={classes.errorMessage}>{t(`errors.${error.message}`)}</Typography>}
                        <FormControl className={classes.form}>
                            {formConfig.map(({ key, label, type, className, required, error, helperText }) =>
                                <TextField className={className} variant="outlined" error={error} helperText={helperText} label={label} required={required} type={type}
                                    onChange={(e) => { handleChange(e, key) }} />)}
                            <Button disabled={formHasError} variant="contained" type="submit" onClick={handleSubmit} className={classes.formElement}>{t('submitButton')}</Button>
                        </FormControl>
                    </>}
            </CenterContainer>
        </Loader>
    )
}

export default SignUp;