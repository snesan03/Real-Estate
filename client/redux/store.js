import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userSlice from './user/userSlice'
import {persistReducer,persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootreducers=combineReducers({user:userSlice})

const persistConfig={
    key:'root',
    storage,
    version:1
}

const persistreducer=persistReducer(persistConfig,rootreducers)

export const store = configureStore({
  reducer: {user:persistreducer},
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
})

export const persistore=persistStore(store)