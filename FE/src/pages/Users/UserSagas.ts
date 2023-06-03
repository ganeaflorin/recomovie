import { PayloadAction } from "@reduxjs/toolkit";
import getUsers from "./api";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { getUsersFailure, getUsersSuccess, getUsersTrigger } from "./UserSlice";
import { getUserId } from "../Login/selectors";
import { User } from "../../entities/common";

export function* getUsersAsync(action: PayloadAction) {
    const { response, error } = yield call(
        getUsers,
        action.payload
    );
    if (response) {
        const userId: string = yield select(getUserId);
        const usersWithoutCurrentUser = response.filter((user: User) => user.id !== userId)

        yield put({
            type: getUsersSuccess.type,
            payload: usersWithoutCurrentUser,
        });
    } else {
        yield put({
            type: getUsersFailure.type,
            payload: error,
        });
    }
}

export function* watchGetUsers() {
    yield takeLatest(
        getUsersTrigger.type,
        getUsersAsync,
    );
}
