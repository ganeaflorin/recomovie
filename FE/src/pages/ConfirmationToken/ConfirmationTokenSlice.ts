import { createSlice } from '@reduxjs/toolkit'
import { ConfirmationTokenState } from '../../entities/signUp';


const initialState: ConfirmationTokenState = {
    isLoading: false,
    confirmationStatus: '',
}

export const confirmationTokenSlice = createSlice({
    name: 'confirmationToken',
    initialState,
    reducers: {
        confirmationTokenTrigger: (state, action) => {
            state.isLoading = true;
        },
        confirmationTokenSuccess: (state, action) => {
            state.confirmationStatus = action.payload;
            state.isLoading = false;
        },
        confirmationTokenFailure: (state, action) => {
            state.confirmationStatus = action.payload;
            state.isLoading = false;
        }
    },
})

export const { confirmationTokenTrigger, confirmationTokenSuccess, confirmationTokenFailure } = confirmationTokenSlice.actions

export default confirmationTokenSlice.reducer