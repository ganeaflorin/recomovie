import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export const getRoot = (state: RootState) => state.confirmationToken;

export const getConfirmationTokenIsLoading = createSelector(
    [getRoot],
    (confirmationToken) => confirmationToken.isLoading,
);

export const getConfirmationStatus = createSelector(
    [getRoot],
    (confirmationToken) => confirmationToken.confirmationStatus,
);