import { call, put, select, takeLatest } from 'redux-saga/effects'
import { loginFailure, loginSuccess, loginTrigger } from './LoginSlice';
import { getLoginFields } from './selectors';
import { LoginForm } from '../../entities/login';
import login from './api';

export function* loginAsync() {
    const fields: LoginForm = yield select(getLoginFields);
    const { response, error } = yield call(
        login,
        fields,
    );
    if (response) {
        yield put({
            type: loginSuccess.type,
            payload: response,
        });
    } else {
        yield put({
            type: loginFailure.type,
            payload: error,
        });
    }
}

export function* watchLogin() {
    yield takeLatest(
        loginTrigger.type,
        loginAsync,
    );
}