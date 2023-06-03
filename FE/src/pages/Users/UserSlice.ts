import { createSlice } from "@reduxjs/toolkit";
import { UsersState } from "../../entities/users";

const initialState: UsersState = {
    users: [],
    isLoading: false,
    error: undefined,
}
export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getUsersTrigger: (state, action) => {
            state.isLoading = true;
        },
        getUsersSuccess: (state, action) => {
            state.users = action.payload;
            state.isLoading = false;
        },
        getUsersFailure: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        clearUsers: (state) => {
            state.users = initialState.users;
        }
    },
})

export const { getUsersTrigger, getUsersSuccess, getUsersFailure, clearUsers } = usersSlice.actions
export default usersSlice.reducer