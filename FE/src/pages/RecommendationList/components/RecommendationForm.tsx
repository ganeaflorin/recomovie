import { Button, TextField, Tooltip, Typography } from '@mui/material';
import React, { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { getRecommendationListTrigger, updateInput } from '../RecommendationListSlice';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '500px',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            width: '90vw',
            marginBottom: '60px'
        },
    },
    inputField: {
        width: '500px',
        marginTop: '20px',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    submitButton: {
        marginTop: '20px',
        width: '100%'
    },
    example: {
        alignSelf: 'end',
        [theme.breakpoints.down('sm')]: {
            alignSelf: 'center',
        },
    },
    instructions: {
        [theme.breakpoints.down('sm')]: {
            padding: '0 8px',
        },
    }
}));

const RecommendationForm = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation('recommendations');
    const { classes } = useStyles();

    const handleSubmit = () => {
        dispatch(getRecommendationListTrigger())
    }

    const changeInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = e.target;
        dispatch(updateInput(value))
    }

    return (
        <div className={classes.container}>
            <Typography className={classes.instructions}>{t('instructions')}</Typography>
            <TextField onChange={changeInput} className={classes.inputField} label={t('input.label')} multiline rows={7}></TextField>
            <Tooltip className={classes.example} title={<Typography variant="body1">{t('example')}</Typography>} placement='right-start'>
                <Button>{t('hoverExample')}</Button>
            </Tooltip>
            <Button variant="contained" className={classes.submitButton} onClick={handleSubmit}>{t('submitButton')}</Button>
        </div>
    )
}

export default RecommendationForm;
