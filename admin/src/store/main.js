import { configureStore } from "@reduxjs/toolkit";

/**
 * Slices
 */
import tournament from './tournaments';

const store = configureStore({
    reducer: {
        tournament: tournament.reducer,
        // ui: ui.reducer
    }
});

export default store;