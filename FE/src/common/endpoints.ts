export const baseUrl = 'http://localhost:8080';

const endpoints = {
    recommendationSystem: baseUrl + '/recommendation-system',
    signUp: baseUrl + '/register',
    confirmationToken: baseUrl + '/register/confirm',
    login: baseUrl + '/login',
    usersSearch: baseUrl + '/users/search',
    playlists: baseUrl + "/playlists",
    savePlaylist: baseUrl + "/playlists/save",
    userPlaylists: baseUrl + "/playlists/userPlaylists",
    friends: baseUrl + "/friends",
    friendsStatus: baseUrl + "/friends/status",
    friendsStatusUpdate: baseUrl + "/friends/status/update",
    friendRequests: baseUrl + "/friends/requests",
    userProfile: baseUrl + "/users",
    newsFeed: baseUrl + "/news"
}

export default endpoints;