import { getRecommendationListFailure, getRecommendationListSuccess, getRecommendationListTrigger, savePlaylistFailure, savePlaylistSuccess, savePlaylistTrigger } from "./RecommendationListSlice";
import getRecommendation, { savePlaylist } from "./api";
import { call, put, select, takeLatest } from 'redux-saga/effects'
import { getInput } from './selectors';
import { PayloadAction } from "@reduxjs/toolkit";

export function* getRecommendationListAsync() {
    const userInput: string = yield select(getInput);
    const { response, error } = yield call(
        getRecommendation,
        { userInput },
    );

    if (response) {
        yield put({
            type: getRecommendationListSuccess.type,
            payload: response,
        });
    } else {
        yield put({
            type: getRecommendationListFailure.type,
            payload: error,
        });
    }
}

export function* savePlaylistAsync(action: PayloadAction) {
    const { response, error } = yield call(
        savePlaylist, action.payload
    );

    if (response) {
        yield put({
            type: savePlaylistSuccess.type,
            payload: response,
        });
    } else {
        yield put({
            type: savePlaylistFailure.type,
            payload: error,
        });
    }
}

export function* watchGetRecommendationList() {
    yield takeLatest(
        getRecommendationListTrigger.type,
        getRecommendationListAsync,
    );
}

export function* watchSavePlaylist() {
    yield takeLatest(
        savePlaylistTrigger.type,
        savePlaylistAsync,
    );
}