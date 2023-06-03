import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export const getRoot = (state: RootState) => state.userProfile;

export const getUserProfileData = createSelector(
    [getRoot],
    (userProfile) => userProfile.data,
);

export const getFriendship = createSelector(
    [getRoot],
    (userProfile) => userProfile.friendship,
);

export const getIsStatusUpdated = createSelector(
    [getRoot],
    (userProfile) => userProfile.isStatusUpdated,
);
export const getStatus = createSelector(
    [getRoot],
    (userProfile) => userProfile.friendship.status,
);

export const getSendingUserId = createSelector(
    [getRoot],
    (userProfile) => userProfile.friendship.sendingUserId,
);


export const getReceivingUserId = createSelector(
    [getRoot],
    (userProfile) => userProfile.friendship.receivingUserId,
);

export const getUserProfileError = createSelector(
    [getRoot],
    (userProfile) => userProfile.userProfileError,
); 