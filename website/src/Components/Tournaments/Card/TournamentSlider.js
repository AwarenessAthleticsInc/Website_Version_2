import TournamentList from "./TournamentList";
const TournamentSlider = (props) => {
    return <TournamentList
        tournaments={props.tournaments}
        registrations={props.registrations}
        user={props.user}
        userRegistrations={props.userRegistrations}
    />
}
export default TournamentSlider;
