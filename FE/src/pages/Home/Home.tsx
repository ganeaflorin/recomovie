import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { getNewsTrigger } from './HomeSlice';
import NewsList from './NewsList';
import { getIsAuthenticated } from '../Login/selectors';
import { useSelector } from 'react-redux';

const Home = () => {
    const { i18n } = useTranslation('home');
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(getIsAuthenticated);

    useEffect(() => {
        dispatch(getNewsTrigger());
    }, [dispatch, i18n.language, isAuthenticated]);

    return (
        <NewsList />
    )
}

export default Home;
