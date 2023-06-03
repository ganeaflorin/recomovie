import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export const getRoot = (state: RootState) => state.friends;

export const getFriendList = createSelector(
    [getRoot],
    (friends) => friends.friendList,
);

export const getFriendRequests = createSelector(
    [getRoot],
    (friends) => friends.friendRequests,
);

export const getFriendUsername = (userId: string | undefined) => createSelector(
    [getFriendList],
    (friendList) => friendList.find(friend => String(friend.id) === userId)?.username
);

export const getFriendListIsLoading = createSelector(
    [getRoot],
    (friends) => friends.isLoading,
);