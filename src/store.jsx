import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import postSlice from "./features/post/postSlice";
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  stateReconciler: hardSet
}

const reducer = combineReducers({
  user:userSlice,
  post:postSlice,
})


const persistedReducer = persistReducer(persistConfig, reducer)


export const store = configureStore({
    // reducer:{
    //     user:userSlice,
    //     post:postSlice,
    // },
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),

})
