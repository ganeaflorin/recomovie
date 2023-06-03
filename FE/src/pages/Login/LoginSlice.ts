import { createSlice } from '@reduxjs/toolkit'
import { LoginState } from '../../entities/login';
import { Languages, ThemeModes } from '../../entities/common';


const initialState: LoginState = {
    form: {
        username: "",
        password: "",
    },
    user: {
        id: "",
        username: "",
        isAuthenticated: false,
        preferredLanguage: Languages.en,
        preferredThemeMode: ThemeModes.light,
    },
    isLoading: false,
    error: undefined,
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        updateField: (state, action) => {
            state.form = { ...state.form, ...action.payload };
        },
        updatePreferredLanguage: (state, action) => {
            state.user.preferredLanguage = action.payload;
        },
        updatePreferredThemeMode: (state, action) => {
            state.user.preferredThemeMode = action.payload;
        },
        loginTrigger: (state) => {
            state.isLoading = true;
        },
        loginSuccess: (state, action) => {
            const { preferredLanguage, preferredThemeMode } = state.user;
            state.user = { ...action.payload, preferredLanguage, preferredThemeMode };
            state.user.isAuthenticated = true;
            state.isLoading = false;
        },
        loginFailure: (state, action) => {
            state.user.isAuthenticated = false;
            state.error = action.payload; state.isLoading = false;
        },
        logoutTrigger: (state) => {
            state.user.isAuthenticated = false;
        }
    },
})

export const { updateField, updatePreferredLanguage, loginTrigger, loginSuccess, loginFailure, logoutTrigger, updatePreferredThemeMode } = loginSlice.actions

export default loginSlice.reducer