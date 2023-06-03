import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export const getRoot = (state: RootState) => state.home;

export const getNews = createSelector(
    [getRoot],
    (home) => home.newsList,
);

export const getIsLoading = createSelector(
    [getRoot],
    (home) => home.isLoading,
);