export const registrationsReducers = {
    setRegistrations(state, action) {
        state.registrations = action.payload
    },
    clearRegistrations(state) {
        state.registrations = [];
    }
}