import { createSlice } from '@reduxjs/toolkit';
import { registrationsReducers } from './registrationsReducers';

const registrationsInit = {
    registrations: []
}

export const registrationsSlice = createSlice({
    name: 'registrations',
    initialState: registrationsInit,
    reducers: registrationsReducers
});
export const registrationsActions = registrationsSlice.actions;