import { createSlice } from '@reduxjs/toolkit'
import { SignUpState } from '../../entities/signUp';


const initialState: SignUpState = {
    form: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    },
    isLoading: false,
    error: undefined,
}

export const signUpSlice = createSlice({
    name: 'signUp',
    initialState,
    reducers: {
        updateField: (state, action) => {
            state.form = { ...state.form, ...action.payload };
        },
        signUpTrigger: (state) => {
            state.isLoading = true;
        },
        signUpSuccess: () => { },
        signUpFailure: () => { }
    },
})

export const { updateField, signUpTrigger, signUpSuccess, signUpFailure } = signUpSlice.actions

export default signUpSlice.reducer