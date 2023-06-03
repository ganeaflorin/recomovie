import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { getNewsTrigger } from './HomeSlice';
import NewsList from './NewsList';

const Home = () => {
    const { i18n } = useTranslation('home');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getNewsTrigger());
    }, [dispatch, i18n.language]);

    return (
        <NewsList />
    )
}

export default Home;
