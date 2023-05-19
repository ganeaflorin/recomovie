import React from 'react'
import { MovieDetails } from '../../entities/recommendationList';
import Movie from '../Movie/Movie';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
    movieContainer: {
        marginBottom: '40px',
    }
}));

const MovieList = ({ movies }: { movies: MovieDetails[] }) => {
    const { classes } = useStyles();
    return (
        <>
            {movies.map(movie => <div className={classes.movieContainer}>
                <Movie movie={movie} /></div>)}
        </>
    )
}

export default MovieList;
