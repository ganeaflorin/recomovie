import { User } from "./common";

export interface UsersState {
    users: User[],
    isLoading: boolean,
    error: Error | undefined
}