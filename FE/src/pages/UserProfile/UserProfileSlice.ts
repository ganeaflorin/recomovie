import { createSlice } from "@reduxjs/toolkit";
import UserProfileState from "../../entities/userProfile";

const initialState: UserProfileState = {
    data: { id: '', username: '' },
    friendship: { sendingUserId: '', receivingUserId: '', status: false },
    isStatusUpdated: false,
    isLoading: false,
    userProfileError: undefined,
    friendshipError: undefined,
}

export const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState,
    reducers: {
        getUserProfileTrigger: (state, action) => {
            state.isLoading = true;
        },
        getUserProfileSuccess: (state, action) => {
            state.data = action.payload;
            state.isLoading = false;
            state.userProfileError = undefined;
        },
        getUserProfileFailure: (state, action) => {
            state.isLoading = false;
            state.userProfileError = action.payload;
        },
        getFriendshipStatusTrigger: (state, action) => {
            state.isLoading = true;
        },
        getFriendshipStatusSuccess: (state, action) => {
            const { id, ...restPayload } = action.payload;
            state.friendship = { ...restPayload };
            state.isLoading = false;
            state.friendshipError = undefined;
        },
        getFriendshipStatusFailure: (state, action) => {
            state.isLoading = false;
            state.friendshipError = action.payload;
        },
        sendFriendRequestTrigger: (state, action) => {
            state.isLoading = true;
        },
        sendFriendRequestSuccess: (state, action) => {
            state.isLoading = false;
            state.friendshipError = undefined;
        },
        sendFriendRequestFailure: (state, action) => {
            state.isLoading = false;
            state.friendshipError = action.payload;
        },
        setIsStatusUpdated: (state, action) => {
            state.isStatusUpdated = action.payload;
        }
    }
})

export const { getUserProfileTrigger, getUserProfileSuccess, getUserProfileFailure,
    getFriendshipStatusTrigger, getFriendshipStatusSuccess, getFriendshipStatusFailure,
    sendFriendRequestTrigger, sendFriendRequestSuccess, sendFriendRequestFailure,
    setIsStatusUpdated } = userProfileSlice.actions;
export default userProfileSlice.reducer;