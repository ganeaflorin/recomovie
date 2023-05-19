import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export const getRoot = (state: RootState) => state.login;

export const getLoginFields = createSelector(
    [getRoot],
    (login) => login.form,
);

export const getLoginError = createSelector(
    [getRoot],
    (login) => login.error,
);

export const getUserId = createSelector(
    [getRoot],
    (login) => login.user.id,
);

export const getUsername = createSelector(
    [getRoot],
    (login) => login.user.username,
);

export const getIsAuthenticated = createSelector(
    [getRoot],
    (login) => login.user.isAuthenticated,
);

export const getPreferredLanguage = createSelector(
    [getRoot],
    (login) => login.user.preferredLanguage,
);