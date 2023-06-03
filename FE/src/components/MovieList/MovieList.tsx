import React from 'react'
import { MovieDetails } from '../../entities/recommendationList';
import Movie from '../Movie/Movie';
import { makeStyles } from 'tss-react/mui';
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles()((theme) => ({
    movieContainer: {
        marginBottom: '40px',
    }
}));

const MovieList = ({ movies }: { movies: MovieDetails[] }) => {
    const { classes } = useStyles();
    return (
        <>
            {movies.map(movie => <div key={uuidv4()} className={classes.movieContainer} >
                <Movie key={uuidv4()} movie={movie} /></div >)
            }
        </>
    )
}

export default MovieList;
