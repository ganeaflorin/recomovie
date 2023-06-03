import { User } from "./common";

export default interface UserProfileState {
    data: User;
    isLoading: boolean;
    isStatusUpdated: boolean;
    friendship: Friendship;
    userProfileError: Error | undefined;
    friendshipError: Error | undefined;

}

export interface Friendship {
    sendingUserId: string;
    receivingUserId: string;
    status: boolean | null;
}