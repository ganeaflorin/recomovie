import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getRecommendationListTrigger } from './RecommendationListSlice';
import { getMovies } from './selectors';

export const RecommendationList = () => {
    const userInput = "I like drama and crime movies. I enjoy watching movies released in 1972. I prefer movies directed by Steven Spielberg starring Robert De Niro, Marlon Brando and Leonardo DiCaprio. I enjoy movies about mafia and gangsters.";
    const payload = { userInput };
    const dispatch = useDispatch();
    const movies = useSelector(getMovies);

    useEffect(() => {
        dispatch(getRecommendationListTrigger(payload))
    }, [dispatch]);

    return (
        <>
            <div>RecommendationList</div>
            {movies.map((movie) => <p>{movie.title}</p>
            )}
        </>
    )
}