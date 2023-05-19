import { combineReducers, configureStore } from '@reduxjs/toolkit'
import recommendationListReducer from './pages/RecommendationList/RecommendationListSlice'
import signUpReducer from './pages/SignUp/SignUpSlice'
import loginReducer, { logoutTrigger } from './pages/Login/LoginSlice'
import confirmationTokenReducer from './pages/ConfirmationToken/ConfirmationTokenSlice'
import playlistsReducer from './pages/Playlists/PlaylistsSlice'
import createSagaMiddleware from 'redux-saga'
import { watchGetRecommendationList, watchSavePlaylist } from './pages/RecommendationList/RecommendationListSagas'
import { watchSignUp } from './pages/SignUp/SignUpSagas'
import { watchLogin } from './pages/Login/LoginSagas'
import { watchConfirmationToken } from './pages/ConfirmationToken/ConfirmationTokenSagas'
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { watchDeletePlaylist, watchGetPlaylists } from './pages/Playlists/PlaylistsSagas'


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
};

const appReducer = combineReducers(reducers);

const rootReducer = (state: any, action: any) => {
    if (action.type === logoutTrigger.type) {
        state = undefined;
        localStorage.clear();
        window.location.reload();
    }
    return appReducer(state, action);
};

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }).concat(sagaMiddleware),
});

export const persistor = persistStore(store);

[watchSignUp, watchLogin, watchConfirmationToken, watchGetRecommendationList, watchSavePlaylist, watchGetPlaylists, watchDeletePlaylist].forEach(saga => sagaMiddleware.run(saga));

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch