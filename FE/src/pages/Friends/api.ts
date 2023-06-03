import endpoints from "../../common/endpoints";
import { getRequest, patchRequest } from "../../http";

export const getFriends = (payload: any) => getRequest(endpoints.friends, payload);

export const updateFriendsStatus = (payload: any) => patchRequest(endpoints.friendsStatusUpdate, payload);

export const getFriendRequests = (payload: any) => getRequest(endpoints.friendRequests, payload);