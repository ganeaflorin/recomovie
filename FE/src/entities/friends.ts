import { User } from "./common";

export interface FriendsState {
    friendList: User[];
    friendRequests: User[];
    isLoading: boolean;
    error: Error | undefined;
}

export interface FriendSectionProps {
    data: User[];
    userId: string;
    updateFriendshipStatus: (sendingUserId: string, receivingUserId: string, status: boolean) => void;
}
