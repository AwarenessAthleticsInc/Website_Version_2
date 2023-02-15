import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "./user/userSlice";
import { tournamentActions } from "./tournaments/tournamentSlice";
import { registrationsActions } from "./registrations/registrationsSlice";
import $ from 'jquery';

const StoreStartup = () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        $.ajax({
            type: "GET",
            url: "/api/startup",
            success: (data) => {
                const userPayload = {
                    startDate: data.currentUser.userData.startDate || '',
                    username: data.currentUser.userData.username,
                    name: {
                        givenName: data.currentUser.userData.name.givenName,
                        middleName: data.currentUser.userData.name.middleName || '',
                        familyName: data.currentUser.userData.name.familyName
                    },
                    phone: data.currentUser.userData.phone,
                    DateOfBirth: data.currentUser.userData.DateOfBirth,
                    role: data.currentUser.userData.roles,
                    photos: data.currentUser.userData.photos,
                    profileImage: data.currentUser.userData.profileImage,
                    token: data.currentUser.userData._id,
                }
                dispatch(userActions.setUser(userPayload));
            }
        });
    }, []);

    useEffect(() => {
        if (!user.token.length > 0) {
            return
        }
        $.ajax({
            type: 'get',
            url: `/api/convener/${user.token}/get`,
            success: (data) => {
                dispatch(tournamentActions.setTournaments(data.tournaments));
                dispatch(registrationsActions.setRegistrations(data.registrations));
            }
        });
    }, [user])
}
export default StoreStartup;