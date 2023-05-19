import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export const getRoot = (state: RootState) => state.playlists;

export const getData = createSelector(
    [getRoot],
    (playlists) => playlists.data,
);

export const getIsLoading = createSelector(
    [getRoot],
    (playlists) => playlists.isLoading,
);

export const getError = createSelector(
    [getRoot],
    (playlists) => playlists.error,
);

export const getIsDeleted = createSelector(
    [getRoot],
    (playlists) => playlists.delete.isDeleted,
);