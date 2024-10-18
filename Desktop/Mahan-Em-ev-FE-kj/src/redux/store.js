import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import userReducer from './slices/user';
import rideReducer from './slices/ride';
export const store = configureStore({
    reducer: {
        user: userReducer,
        ride: rideReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

setupListeners(store.dispatch);
