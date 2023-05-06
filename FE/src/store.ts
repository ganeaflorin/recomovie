import { configureStore } from '@reduxjs/toolkit'
import recommendationListReducer from './pages/RecommendationList/RecommendationListSlice'
import createSagaMiddleware from 'redux-saga'
import { watchGetRecommendationList } from './pages/RecommendationList/RecommendationListSagas'


const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
    reducer: {
        recommendationList: recommendationListReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})
sagaMiddleware.run(watchGetRecommendationList)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch