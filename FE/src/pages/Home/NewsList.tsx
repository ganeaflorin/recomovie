import { Typography } from '@mui/material';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getIsLoading, getNews } from './selectors';
import { NewsType } from '../../entities/home';
import News from '../../components/News';
import { makeStyles } from 'tss-react/mui';
import Loader from '../../components/Loader';

const useStyles = makeStyles()((theme) => ({
    title: {
        margin: '60px 0 0 0',
        textAlign: 'center'
    }
}));

const NewsList = () => {
    const { t } = useTranslation('home');
    const newsList = useSelector(getNews);
    const { classes } = useStyles();
    const isLoading = useSelector(getIsLoading);

    return (
        <Loader condition={isLoading}>
            <Typography variant="h4" className={classes.title}>
                {t('newsTitle')}
            </Typography>
            {newsList.map((news: NewsType, index: number) => <News news={news} borderCondition={index !== newsList.length - 1} />)}
        </Loader>
    )
}

export default NewsList;
