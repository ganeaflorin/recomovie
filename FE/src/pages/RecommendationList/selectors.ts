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