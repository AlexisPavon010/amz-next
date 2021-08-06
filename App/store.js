import { configureStore } from '@reduxjs/toolkit'
import basketReducer from '../slices/basketReducer'


export const store = configureStore({
    reducer: {
        basket: basketReducer,
    }
});

