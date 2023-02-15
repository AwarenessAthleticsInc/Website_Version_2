import TournamentCard from "./TournamentCard";
import Carousel from "../../Layout/Carousel";
const TournamentList = (props) => {
    return <Carousel>
        {props.tournaments.slice(0, 14).map((tournaments) => {
            const registrations = props.registrations.filter((event) => {
                return event.tournament._id === tournaments._id;
            });
            var type = tournaments.tournamentType.replace(" ", "");
            if (type.includes('TOC')) {
                return;
            }
            return <TournamentCard
                key={tournaments._id}
                tournament={tournaments}
                registrations={registrations}
                user={props.user}
                userRegistrations={props.userRegistrations}
            />
        })}
    </Carousel>
}
export default TournamentList;

