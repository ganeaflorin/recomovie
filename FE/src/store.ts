import { PayloadAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import recommendationListReducer from './pages/RecommendationList/RecommendationListSlice';
import signUpReducer from './pages/SignUp/SignUpSlice';
import loginReducer, { logoutTrigger } from './pages/Login/LoginSlice';
import confirmationTokenReducer from './pages/ConfirmationToken/ConfirmationTokenSlice';
import playlistsReducer from './pages/Playlists/PlaylistsSlice';
import friendsReducer from './pages/Friends/FriendsSlice';
import usersReducer from './pages/Users/UserSlice';
import homeReducer from './pages/Home/HomeSlice';
import userProfileReducer from './pages/UserProfile/UserProfileSlice';
import createSagaMiddleware from 'redux-saga';
import { watchGetRecommendationList, watchSavePlaylist } from './pages/RecommendationList/RecommendationListSagas';
import { watchSignUp } from './pages/SignUp/SignUpSagas';
import { watchLogin } from './pages/Login/LoginSagas';
import { watchConfirmationToken } from './pages/ConfirmationToken/ConfirmationTokenSagas';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { watchDeletePlaylist, watchGetPlaylists } from './pages/Playlists/PlaylistsSagas';
import { watchGetFriendList, watchGetFriendRequests, watchUpdateFriendStatus } from './pages/Friends/FriendsSagas';
import { watchGetUsers } from './pages/Users/UserSagas';
import { watchGetFriendshipStatus, watchGetUserProfile, watchSendFriendRequest } from './pages/UserProfile/UserProfileSagas';
import { watchGetNews } from './pages/Home/HomeSagas';


const loginConfig = {
    key: 'login',
    storage,
    whitelist: ['user']
};

const reducers = {
    recommendationList: recommendationListReducer,
    signUp: signUpReducer,
    login: persistReducer(loginConfig, loginReducer),
    confirmationToken: confirmationTokenReducer,
    playlists: playlistsReducer,
    friends: friendsReducer,
    users: usersReducer,
    userProfile: userProfileReducer,
    home: homeReducer,
};

const appReducer = combineReducers(reducers);

const rootReducer = (state: any, action: PayloadAction) => {
    if (action.type === logoutTrigger.type) {
        state = undefined;
        localStorage.clear();
    }
    return appReducer(state, action);
};

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(
        {
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }
    ).concat(sagaMiddleware),
});

export const persistor = persistStore(store);

[watchSignUp, watchLogin, watchConfirmationToken,
    watchGetRecommendationList, watchSavePlaylist, watchGetPlaylists,
    watchDeletePlaylist, watchGetFriendList, watchUpdateFriendStatus,
    watchGetFriendRequests, watchGetUsers, watchGetUserProfile,
    watchGetFriendshipStatus, watchSendFriendRequest, watchGetNews,
].forEach(saga => sagaMiddleware.run(saga));

export type RootState = ReturnType<typeof store.getState>