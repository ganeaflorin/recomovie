export const baseUrl = 'http://localhost:8080';

const endpoints = {
    recommendationSystem: baseUrl + '/recommendation-system',
    signUp: baseUrl + '/register',
    confirmationToken: baseUrl + '/register/confirm',
    login: baseUrl + '/login',
    playlists: baseUrl + "/playlists",
    savePlaylist: baseUrl + "/playlists/save",
    userPlaylists: baseUrl + "/playlists/userPlaylists",
}

export default endpoints;