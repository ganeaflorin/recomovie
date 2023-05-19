import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export const getRoot = (state: RootState) => state.recommendationList;

export const getMovies = createSelector(
    [getRoot],
    (recommendationList) => recommendationList.movies,
);

export const getIsLoading = createSelector(
    [getRoot],
    (recommendationList) => recommendationList.isLoading,
);

export const getInput = createSelector(
    [getRoot],
    (recommendationList) => recommendationList.input,
);

export const getError = createSelector(
    [getRoot],
    (recommendationList) => recommendationList.error,
);

export const getMoviesIds = createSelector(
    [getRoot],
    (recommendationList) => recommendationList.movies.map(movie => movie.id),
);


export const getPlaylistData = createSelector(
    [getRoot],
    (recommendationList) => recommendationList.playlist
); 