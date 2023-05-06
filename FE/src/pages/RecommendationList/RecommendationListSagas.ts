import { PayloadAction } from '@reduxjs/toolkit';
import { getRecommendationListFailure, getRecommendationListSuccess, getRecommendationListTrigger } from "./RecommendationListSlice";
import getRecommendation from "./api";
import { call, put, takeLatest } from 'redux-saga/effects'

export function* getRecommendationListAsync(action: PayloadAction) {
    const { response, error } = yield call(
        getRecommendation,
        action.payload,
    );

    if (response) {
        yield put({
            type: getRecommendationListSuccess.type,
            payload: response,
        });
    } else {
        yield put({
            type: getRecommendationListFailure.type,
            payload: { error: error.toJSON() },
        });
    }
}

export function* watchGetRecommendationList() {
    yield takeLatest(
        getRecommendationListTrigger.type,
        getRecommendationListAsync,
    );
}