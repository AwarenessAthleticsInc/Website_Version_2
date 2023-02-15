import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./user/userSlice";
import { tournamentSlice } from "./tournaments/tournamentSlice";
import { registrationsSlice } from "./registrations/registrationsSlice";

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        tournaments: tournamentSlice.reducer,
        registrations: registrationsSlice.reducer
    }
});

export default store;