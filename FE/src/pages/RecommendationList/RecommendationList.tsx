import React from 'react'
import { useSelector } from 'react-redux';
import { getError, getIsLoading, getMovies } from './selectors';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CenterContainer from '../../components/CenterContainer';
import { makeStyles } from 'tss-react/mui';
import Loader from '../../components/Loader';
import MovieList from '../../components/MovieList';
import RecommendationForm from './components/RecommendationForm';
import PlaylistForm from './components/PlaylistForm';


const useStyles = makeStyles()((theme) => ({
    title: {
        maxWidth: '900px',
        margin: '120px 0 100px 0',
        textAlign: 'center',
    }
}));

export const RecommendationList = () => {
    const { t } = useTranslation('recommendations');
    const movies = useSelector(getMovies);
    const isLoading = useSelector(getIsLoading);
    const { classes } = useStyles();
    const error = useSelector(getError);


    return (
        <Loader condition={isLoading} >
            <CenterContainer removeMarginTop={movies.length > 0}>
                {error ? <Typography>{error.message}</Typography> :
                    <>
                        {movies.length === 0 && <RecommendationForm />}
                        {movies.length > 0 &&
                            <>
                                <Typography className={classes.title} variant="h5">{t('title')}</Typography>
                                <MovieList movies={movies} />
                                <PlaylistForm />
                            </>
                        }
                    </>
                }
            </CenterContainer>
        </Loader >
    )
}
