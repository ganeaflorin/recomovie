import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export const getRoot = (state: RootState) => state.signUp;

export const getSignUpFields = createSelector(
    [getRoot],
    (signUp) => signUp.form,
);

export const getIsSuccessSignUp = createSelector(
    [getRoot],
    (signUp) => signUp.isSuccessSignUp,
);

export const getSignUpIsLoading = createSelector(
    [getRoot],
    (signUp) => signUp.isLoading,
);

export const getSignUpError = createSelector(
    [getRoot],
    (signUp) => signUp.error,
);