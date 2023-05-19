export interface MovieDetails {
    id: string;
    title: string;
    description: string;
    director: string;
    posterPath: string,
    runtime: string,
    releaseDate: string,
    cast: string[],
    genres: string[],
}

interface PlaylistState {
    name: string;
    isSaved: boolean;
    isLoading: boolean;
    error: Error | undefined;
}
export interface RecommendationListState {
    movies: MovieDetails[];
    input: string;
    error: Error | undefined;
    isLoading: boolean;
    playlist: PlaylistState;
}