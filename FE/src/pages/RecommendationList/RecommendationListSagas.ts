import { getRecommendationListFailure, getRecommendationListSuccess, getRecommendationListTrigger, savePlaylistFailure, savePlaylistSuccess, savePlaylistTrigger } from "./RecommendationListSlice";
import getRecommendation, { savePlaylist } from "./api";
import { call, put, select, takeLatest } from 'redux-saga/effects'
import { getInput, getMoviesIds, getPlaylistData } from './selectors';
import { MovieDetails } from "../../entities/recommendationList";
import { getUserId } from "../Login/selectors";

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

export function* savePlaylistAsync() {
    const movies: MovieDetails[] = yield select(getMoviesIds);
    const { name } = yield select(getPlaylistData);
    const userInput: string = yield select(getInput);
    const userId: string = yield select(getUserId);

    const { response, error } = yield call(
        savePlaylist, { movies, name, userInput, userId }
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