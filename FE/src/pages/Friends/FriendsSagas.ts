import { call, put, takeLatest } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit';
import { getFriendRequests, getFriends, updateFriendsStatus } from './api';
import { getFriendListFailure, getFriendListSuccess, getFriendListTrigger, getFriendRequestsFailure, getFriendRequestsSuccess, updateFriendStatusFailure, updateFriendStatusSuccess, updateFriendStatusTrigger } from './FriendsSlice';

export function* getFriendListAsync(action: PayloadAction) {
    const { response, error } = yield call(
        getFriends,
        action.payload
    );

    if (response) {
        yield put({
            type: getFriendListSuccess.type,
            payload: response,
        });
    } else {
        yield put({
            type: getFriendListFailure.type,
            payload: error,
        });
    }
}

export function* updateFriendStatusAsync(action: PayloadAction<any>) {
    const { response, error } = yield call(
        updateFriendsStatus,
        action.payload
    );
    if (response) {
        yield put({
            type: updateFriendStatusSuccess.type,
            payload: 'aa'
        });
    } else {
        yield put({
            type: updateFriendStatusFailure.type,
            payload: error,
        });
    }
}


export function* getFriendRequestsAsync(action: PayloadAction) {
    const { response, error } = yield call(
        getFriendRequests,
        action.payload
    );

    if (response) {
        yield put({
            type: getFriendRequestsSuccess.type,
            payload: response,
        });
    } else {
        yield put({
            type: getFriendRequestsFailure.type,
            payload: error,
        });
    }
}

export function* watchGetFriendRequests() {
    yield takeLatest(
        getFriendListTrigger.type,
        getFriendRequestsAsync,
    );
}

export function* watchGetFriendList() {
    yield takeLatest(
        getFriendListTrigger.type,
        getFriendListAsync,
    );
}


export function* watchUpdateFriendStatus() {
    yield takeLatest(
        updateFriendStatusTrigger.type,
        updateFriendStatusAsync,
    );
}