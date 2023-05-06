import { configureStore } from '@reduxjs/toolkit'
import recommendationListReducer from './pages/RecommendationList/RecommendationListSlice'
import signUpReducer from './pages/SignUp/SignUpSlice'
import createSagaMiddleware from 'redux-saga'
import { watchGetRecommendationList } from './pages/RecommendationList/RecommendationListSagas'
import { watchSignUp } from './pages/SignUp/SignUpSagas'


const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
    reducer: {
        recommendationList: recommendationListReducer,
        signUp: signUpReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});
[watchGetRecommendationList, watchSignUp].forEach(saga => sagaMiddleware.run(saga))
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch