import { createSlice } from "@reduxjs/toolkit";
import { HomeState } from "../../entities/home";

const initialState: HomeState = {
    newsList: [],
    isLoading: false,
    error: undefined,
};

export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        getNewsTrigger: (state) => {
            state.isLoading = true;
            state.error = undefined;
        },
        getNewsSuccess: (state, action) => {
            state.newsList = action.payload;
            state.isLoading = false;
        },
        getNewsFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    },
})

export const { getNewsTrigger, getNewsSuccess, getNewsFailure } = homeSlice.actions

export default homeSlice.reducer