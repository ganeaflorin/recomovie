import { call, put, takeLatest } from 'redux-saga/effects'
import getUserPlaylists, { deleteUserPlaylist } from './api';
import { PayloadAction } from '@reduxjs/toolkit';
import { deletePlaylistFailure, deletePlaylistSuccess, deletePlaylistTrigger, getPlaylistsFailure, getPlaylistsSuccess, getPlaylistsTrigger } from './PlaylistsSlice';

export function* getPlaylistsAsync(action: PayloadAction) {
    const { response, error } = yield call(
        getUserPlaylists,
        action.payload
    );

    if (response) {
        yield put({
            type: getPlaylistsSuccess.type,
            payload: response,
        });
    } else {
        yield put({
            type: getPlaylistsFailure.type,
            payload: error,
        });
    }
}



export function* deletePlaylistAsync(action: PayloadAction) {
    const { response, error } = yield call(
        deleteUserPlaylist,
        action.payload
    );
    if (response) {
        yield put({
            type: deletePlaylistSuccess.type,
            payload: response,
        });
    } else {
        yield put({
            type: deletePlaylistFailure.type,
            payload: error,
        });
    }
}

export function* watchGetPlaylists() {
    yield takeLatest(
        getPlaylistsTrigger.type,
        getPlaylistsAsync,
    );
}

export function* watchDeletePlaylist() {
    yield takeLatest(
        deletePlaylistTrigger.type,
        deletePlaylistAsync,
    );
}