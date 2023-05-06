import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export const getRoot = (state: RootState) => state.signUp;

export const getSignUpFields = createSelector(
    [getRoot],
    (signUp) => signUp.form,
);
