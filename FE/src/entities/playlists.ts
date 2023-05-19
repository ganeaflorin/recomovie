import { MovieDetails } from "./recommendationList";

export interface Playlist {
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
    data: Playlist[];
    isLoading: boolean;
    error: Error | undefined;
    delete: DeleteState;
}

export interface PlaylistProps {
    playlist: Playlist;
    borderCondition?: boolean;
    marginCondition?: boolean;
    handleDelete: (playlistId: string) => void;
}