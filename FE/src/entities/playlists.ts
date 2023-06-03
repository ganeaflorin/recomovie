import { MovieDetails } from "./recommendationList";

export interface PlaylistType {
    id: string;
    userInput: string;
    name: string;
    movies: MovieDetails[];
}

interface DeleteState {
    isLoading: boolean;
    error: Error | undefined;
    isDeleted: boolean;
}

export default interface PlaylistsState {
    data: PlaylistType[];
    isLoading: boolean;
    error: Error | undefined;
    delete: DeleteState;
}

export interface PlaylistProps {
    playlist: PlaylistType;
    borderCondition?: boolean;
    marginCondition?: boolean;
    canDelete: boolean;
    handleDelete: (playlistId: string) => void;
}