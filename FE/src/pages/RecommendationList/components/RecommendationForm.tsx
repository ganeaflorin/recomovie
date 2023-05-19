import { Button, TextField, Tooltip, Typography } from '@mui/material';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { getRecommendationListTrigger, updateInput } from '../RecommendationListSlice';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '500px',
    },
    inputField: {
        width: '500px',
        marginTop: '20px',
    },
    submitButton: {
        marginTop: '20px',
    },
    example: {
        alignSelf: 'end',
    },
}));

const RecommendationForm = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation('recommendations');
    const { classes } = useStyles();

    const handleSubmit = () => {
        dispatch(getRecommendationListTrigger())
    }

    const changeInput = (e: any) => {
        const { value } = e.target;
        dispatch(updateInput(value))
    }

    return (
        <>
            {
                <div className={classes.container}>
                    <Typography>{t('instructions')}</Typography>
                    <TextField onChange={changeInput} className={classes.inputField} label={t('input.label')} multiline rows={7}></TextField>
                    <Tooltip className={classes.example} title={t('example')} placement='right-start'>
                        <Button>{t('hoverExample')}</Button>
                    </Tooltip>
                    <Button variant="contained" className={classes.submitButton} onClick={handleSubmit}>{t('submitButton')}</Button>
                </div>
            }
        </>)
}

export default RecommendationForm;
