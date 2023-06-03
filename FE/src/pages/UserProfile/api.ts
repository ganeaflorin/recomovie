import endpoints from "../../common/endpoints";
import { getRequest, postRequest } from "../../http";

const getUserProfile = (payload: any) => getRequest(endpoints.userProfile, payload);

export const getFriendshipStatus = (payload: any) => getRequest(endpoints.friendsStatus, payload);

export const newFriendRequest = (payload: any) => postRequest(endpoints.friends, payload);

export default getUserProfile;