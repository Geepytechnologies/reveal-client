import { configureStore, combineReducers } from "@reduxjs/toolkit";
import menuReducer from './menuSlice';
import userReducer from '../utils/userSlice'
import videoReducer from '../utils/videoSlice'
import requestReducer from "../utils/request"
import modeReducer from "../utils/mode";
import deleteReducer from "../utils/deletevideo";
import editReducer from "../utils/editvideo";
import uservideoReducer from "../utils/uservideos";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['user','menu','mode'],
} ;
const rootReducer = combineReducers({user: userReducer, menu: menuReducer, video: videoReducer, request: requestReducer, mode:modeReducer, delete:deleteReducer, uservideos: uservideoReducer, edit: editReducer,})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch