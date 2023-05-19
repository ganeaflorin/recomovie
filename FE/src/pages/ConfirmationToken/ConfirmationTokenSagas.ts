import { call, put, takeLatest } from 'redux-saga/effects'
import getConfirmationToken from './api';
import { PayloadAction } from '@reduxjs/toolkit';
import { confirmationTokenFailure, confirmationTokenSuccess, confirmationTokenTrigger } from './ConfirmationTokenSlice';

export function* confirmationTokenAsync(action: PayloadAction) {
    const { response, error } = yield call(
        getConfirmationToken, action.payload
    );
    if (response) {
        yield put({
            type: confirmationTokenSuccess.type,
            payload: response,
        });
    } else {
        yield put({
            type: confirmationTokenFailure.type,
            payload: error.message,
        });
    }
}

export function* watchConfirmationToken() {
    yield takeLatest(
        confirmationTokenTrigger.type,
        confirmationTokenAsync,
    );
}