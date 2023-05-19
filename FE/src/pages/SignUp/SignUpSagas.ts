import { call, put, select, takeLatest } from 'redux-saga/effects'
import { signUpFailure, signUpSuccess, signUpTrigger } from './SignUpSlice';
import signUp from './api';
import { getSignUpFields } from './selectors';
import { SignUpForm } from '../../entities/signUp';

export function* signUpAsync() {
    const fields: SignUpForm = yield select(getSignUpFields);
    const { response, error } = yield call(
        signUp,
        fields,
    );

    if (response) {
        yield put({
            type: signUpSuccess.type,
            payload: response,
        });
    } else {
        yield put({
            type: signUpFailure.type,
            payload: error,
        });
    }
}

export function* watchSignUp() {
    yield takeLatest(
        signUpTrigger.type,
        signUpAsync,
    );
}