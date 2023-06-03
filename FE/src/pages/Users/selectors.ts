import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export const getRoot = (state: RootState) => state.users;

export const getUsers = createSelector(
    [getRoot],
    (users) => users.users,
);


