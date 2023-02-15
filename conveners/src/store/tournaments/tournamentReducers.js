export const tournamentReducers = {
    setTournaments(state, action) {
        state.tournaments = action.payload;
    },
    clearTournament(state) {
        state.tournaments = [];
    }
}