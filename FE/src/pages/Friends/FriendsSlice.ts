import { createSlice } from '@reduxjs/toolkit'
import { FriendsState } from '../../entities/friends'

const initialState: FriendsState = {
    friendList: [],
    friendRequests: [],
    error: undefined,
    isLoading: false,
}

export const friendsSlice = createSlice({
    name: 'friends',
    initialState,
    reducers: {
        getFriendListTrigger: (state, action) => {
            state.isLoading = true;
        },
        getFriendListSuccess: (state, action) => {
            state.friendList = action.payload;
            state.isLoading = false;
            state.error = undefined;
        },
        getFriendListFailure: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        updateFriendStatusTrigger: (state, action) => {
            state.isLoading = true;
        },
        updateFriendStatusSuccess: (state, action) => {
            state.isLoading = false;
            state.error = undefined;
        },
        updateFriendStatusFailure: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        getFriendRequestsFailure: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        getFriendRequestsTrigger: (state, action) => {
            state.isLoading = true;
        },
        getFriendRequestsSuccess: (state, action) => {
            state.friendRequests = action.payload;
            state.isLoading = false;
            state.error = undefined;
        },
    },
})

export const { getFriendListTrigger, getFriendListSuccess, getFriendListFailure,
    updateFriendStatusTrigger, updateFriendStatusSuccess, updateFriendStatusFailure,
    getFriendRequestsFailure, getFriendRequestsTrigger, getFriendRequestsSuccess } = friendsSlice.actions
export default friendsSlice.reducer