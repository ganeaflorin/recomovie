import { createSlice } from '@reduxjs/toolkit'
import { RecommendationListState } from '../../entities/recommendationList';



const initialState: RecommendationListState = {
    movies: [],
    input: 'I like drama and crime movies.',
    isLoading: false,
    error: undefined,
    playlist: {
        name: '',
        isSaved: false,
        isLoading: false,
        error: undefined,
    }
}

export const recommendationListSlice = createSlice({
    name: 'recommendationList',
    initialState,
    reducers: {
        clearData: (state) => {
            return { ...initialState };
        },
        updateInput: (state, action) => {
            state.input = action.payload;
        },
        updatePlaylistName: (state, action) => {
            state.playlist.name = action.payload;
        },
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
        getRecommendationListTrigger: (state) => {
            state.isLoading = true;
        },
        savePlaylistTrigger: (state) => {
            state.playlist.isLoading = true;
        },
        savePlaylistSuccess: (state) => {
            state.playlist.isSaved = true;
            state.playlist.isLoading = false;
        },
        savePlaylistFailure: (state, action) => {
            state.playlist.error = action.payload;
            state.playlist.isLoading = false;
        }
    },
})

export const { clearData, updateInput, getRecommendationListSuccess, getRecommendationListFailure, getRecommendationListTrigger, updatePlaylistName, savePlaylistTrigger, savePlaylistSuccess, savePlaylistFailure } = recommendationListSlice.actions
export default recommendationListSlice.reducer