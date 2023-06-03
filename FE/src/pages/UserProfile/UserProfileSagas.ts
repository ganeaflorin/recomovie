import { call, put, takeLatest } from "redux-saga/effects";
import getUserProfile, { getFriendshipStatus, newFriendRequest } from "./api";
import { PayloadAction } from "@reduxjs/toolkit";
import { getFriendshipStatusFailure, getFriendshipStatusSuccess, getFriendshipStatusTrigger, getUserProfileFailure, getUserProfileSuccess, getUserProfileTrigger, sendFriendRequestFailure, sendFriendRequestSuccess, sendFriendRequestTrigger } from "./UserProfileSlice";

export function* getUserProfileAsync(action: PayloadAction) {
    const { response, error } = yield call(
        getUserProfile,
        action.payload
    );

    if (response) {
        yield put({
            type: getUserProfileSuccess.type,
            payload: response,
        });
    } else {
        yield put({
            type: getUserProfileFailure.type,
            payload: error,
        });
    }
}

export function* getFriendshipStatusAsync(action: PayloadAction) {
    const { response, error } = yield call(
        getFriendshipStatus,
        action.payload
    );

    if (response) {
        yield put({
            type: getFriendshipStatusSuccess.type,
            payload: response,
        });
    } else {
        yield put({
            type: getFriendshipStatusFailure.type,
            payload: error,
        });
    }
}

export function* sendFriendRequestAsync(action: PayloadAction) {
    const { response, error } = yield call(
        newFriendRequest,
        action.payload
    );

    if (response) {
        yield put({
            type: sendFriendRequestSuccess.type,
            payload: 'aaa'
        });
    } else {
        yield put({
            type: sendFriendRequestFailure.type,
            payload: error,
        });
    }
}


export function* watchSendFriendRequest() {
    yield takeLatest(
        sendFriendRequestTrigger.type,
        sendFriendRequestAsync
    );
}

export function* watchGetFriendshipStatus() {
    yield takeLatest(
        getFriendshipStatusTrigger.type,
        getFriendshipStatusAsync
    );
}


export function* watchGetUserProfile() {
    yield takeLatest(
        getUserProfileTrigger.type,
        getUserProfileAsync
    );
}

