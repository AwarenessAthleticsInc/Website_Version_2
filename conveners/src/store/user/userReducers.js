export const userReducers = {
    setUser(state, action) {
        state.startDate = action.payload.startDate;
        state.username = action.payload.username;
        state.name.givenName = action.payload.name.givenName;
        state.name.middleName = action.payload.name.middleName;
        state.name.familyName = action.payload.name.familyName;
        state.phone = action.payload.phone;
        state.DateOfBirth = action.payload.DateOfBirth;
        state.photos = action.payload.photos;
        state.profileImage = action.payload.profileImage;
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.auth = true;
    },
    clearUser(state) {
        state.startDate = '';
        state.username = '';
        state.name.familyName = ''; 
        state.name.middleName = '';
        state.name.givenName = '';
        state.phone = '';
        state.DateOfBirth = '';
        state.photos = [];
        state.profileImage = '';
        state.token = '';
        state.role = '';
        state.auth = false;
    }
}