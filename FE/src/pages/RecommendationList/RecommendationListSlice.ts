import { createSlice } from '@reduxjs/toolkit'

interface Movie {
    id: string;
    title: string;
    consineSimilarity: string;
}

export interface RecommendationListState {
    movies: Movie[];
    error: Error | undefined;
    isLoading: boolean;
}

const initialState: RecommendationListState = {
    movies: [],
    isLoading: false,
    error: undefined,
}

export const recommendationListSlice = createSlice({
    name: 'recommendationList',
    initialState,
    reducers: {
        getRecommendationListSuccess: (state, action) => {
            state.movies = action.payload;
            state.error = undefined;
            state.isLoading = false;
        },
        getRecommendationListFailure: (state, action) => {
            state.movies = initialState.movies;
            state.error = action.payload;
            state.isLoading = false;
        },
        getRecommendationListTrigger: (state, action) => {
            state.isLoading = true;
        }
    },
})

// Action creators are generated for each case reducer function
export const { getRecommendationListSuccess, getRecommendationListFailure, getRecommendationListTrigger } = recommendationListSlice.actions

export default recommendationListSlice.reducer