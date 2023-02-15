import { createSlice } from '@reduxjs/toolkit';
import { userReducers } from './userReducers';

const userInit = {
    startDate: '',
    username: '',
    name: {
        givenName: '',
        middleName: '',
        familyName: ''
    },
    phone: '',
    DateOfBirth: '',
    role: '',
    photos: [],
    profileImage: '',
    token: '',
    auth: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState: userInit,
    reducers: userReducers
});
export const userActions = userSlice.actions;