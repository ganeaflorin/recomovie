import { call, put, select, takeLatest } from 'redux-saga/effects'
import getNewsList from './api';
import { getNewsFailure, getNewsSuccess, getNewsTrigger } from './HomeSlice';
import { getPreferredLanguage } from '../Login/selectors';
import { Languages } from '../../entities/common';

export function* getNewsAsync() {
    const language: Languages = yield select(getPreferredLanguage);
    const { response, error } = yield call(
        getNewsList,
        { language },
    );
    if (response) {
        yield put({
            type: getNewsSuccess.type,
            payload: response,
        });
    } else {
        yield put({
            type: getNewsFailure.type,
            payload: error,
        });
    }
}

export function* watchGetNews() {
    yield takeLatest(
        getNewsTrigger.type,
        getNewsAsync,
    );
}
