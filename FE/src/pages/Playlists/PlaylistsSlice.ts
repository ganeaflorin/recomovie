import { createSlice } from '@reduxjs/toolkit'
import PlaylistsState from '../../entities/playlists';

const initialState: PlaylistsState = {
    data: [],
    isLoading: false,
    error: undefined,
    delete: {
        error: undefined,
        isLoading: false,
        isDeleted: false,
    }
}

export const playlistsSlice = createSlice({
    name: 'playlists',
    initialState,
    reducers: {
        getPlaylistsTrigger: (state, action) => {
            state.isLoading = true;
        },
        getPlaylistsSuccess: (state, action) => {
            state.data = action.payload;
            state.isLoading = false;
        },
        getPlaylistsFailure: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        deletePlaylistTrigger: (state, action) => {
            state.delete.isLoading = true;
        },
        deletePlaylistSuccess: (state) => {
            state.delete.isDeleted = true;
            state.delete.isLoading = false;
        },
        deletePlaylistFailure: (state, action) => {
            state.delete.error = action.payload;
            state.delete.isLoading = false;
        },
        clearIsDeleted: (state) => {
            state.delete.isDeleted = false;
        }
    },
})

export const { getPlaylistsTrigger, getPlaylistsSuccess, getPlaylistsFailure, deletePlaylistTrigger, deletePlaylistSuccess, deletePlaylistFailure, clearIsDeleted } = playlistsSlice.actions
export default playlistsSlice.reducer