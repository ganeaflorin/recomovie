export interface NewsType {
    title: string;
    description: string;
    content: string;
    image: string;
}

export interface HomeState {
    newsList: NewsType[];
    isLoading: boolean;
    error: Error | undefined;
}