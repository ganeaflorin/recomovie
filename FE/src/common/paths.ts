const paths = {
    root: '/',
    home: '/home',
    signUp: '/sign-up',
    confirmationToken: '/sign-up/confirm',
    login: '/login',
    recommendations: '/recommendations',
    playlists: '/playlists',
    myFriends: '/my-friends',
    forbidden: '/forbidden',
    profile: '/profile'
}

export const unprotectedPaths = [paths.login, paths.signUp, paths.confirmationToken, paths.root, paths.home];

export default paths;
