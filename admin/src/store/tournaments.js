import { createSlice } from "@reduxjs/toolkit";

const initialValues = {
    tournaments: []
}

const tournamentSlice = createSlice({
    name: 'tournaments',
    initialState: initialValues,
    reducers: {
        addTournament() {
            
        },
        removeTournament() {

        },
        registerTeam() {

        }
    }
});


const tournamentAction = tournamentSlice.actions;

export default tournamentSlice;

export { tournamentAction }