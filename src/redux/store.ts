import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import { MMKV } from 'react-native-mmkv'
import quoteReducer from './features/quotes/quoteSlice'
import taskReducer from './features/tasks/taskSlice'
import focusReducer from './features/focus/focusSlice'

// Create MMKV instance for persistence
const storage = new MMKV()

// Redux persist storage adapter for MMKV
const reduxStorage = {
  setItem: (key: string, value: string) => {
    storage.set(key, value)
    return Promise.resolve(true)
  },
  getItem: (key: string) => {
    const value = storage.getString(key)
    return Promise.resolve(value)
  },
  removeItem: (key: string) => {
    storage.delete(key)
    return Promise.resolve()
  },
}

// Combine reducers
const rootReducer = combineReducers({
  quotes: quoteReducer,
  tasks: taskReducer,
  focus: focusReducer,
})

// Persist configuration
const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  whitelist: ['quotes', 'tasks', 'focus'], // Persist all slices
}

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Configure store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

// Create persistor
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
