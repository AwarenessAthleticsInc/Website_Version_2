import { createSlice } from '@reduxjs/toolkit';
import { tournamentReducers } from './tournamentReducers';

const tournamentInit = {
    tournaments: []
}

export const tournamentSlice = createSlice({
    name: 'tournaments',
    initialState: tournamentInit,
    reducers: tournamentReducers
});
export const tournamentActions = tournamentSlice.actions;