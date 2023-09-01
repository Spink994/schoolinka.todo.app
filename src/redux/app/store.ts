import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
	persistStore,
	persistReducer,
	REGISTER,
	REHYDRATE,
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { todoSlice } from '../features/todo/todoSlice';

const persistConfig = {
	key: 'root',
	storage,
	version: 1,
	whitelist: [''],
};

const rootReducers = combineReducers({
	[todoSlice.name]: todoSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
	reducer: persistedReducer,
	/* This code is configuring the middleware for the Redux store. The `getDefaultMiddleware` function
	returns an array of middleware that is included by default in the Redux store.*/
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					FLUSH,
					REHYDRATE,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER,
				],
			},
		}),
	devTools: true,
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
