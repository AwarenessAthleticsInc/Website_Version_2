import $ from "jquery";
import { useEffect, useState } from "react";
import { formatDateString } from "../../../Logic";
const SpotsLeft = (props) => {
    const [left, setLeft] = useState();
    useEffect(() => {
        if(props.tournament.tournamentType.trim().includes("NSA")) {
           setLeft("Please see NSA site");
           return;
        }
        var CancellationDate = new Date(formatDateString(props.tournament.dateTime.EntryDeadline));
        var today = new Date();
        const todayDate = today.getDate() + "-" + today.getMonth() + "-" + today.getFullYear();
        const deadline = CancellationDate.getDate() + "-" + CancellationDate.getMonth() + "-" + CancellationDate.getFullYear();
        if (todayDate !== deadline && CancellationDate < today) {
            setLeft("Deadline has Passed");
            return;
        } 
        if (props.count <= 0) {
            setLeft("0 (sold out)");
            return;
        } 
        setLeft(String(props.count));
    }, []);
    
    return <p class="small m-0">{`Spots Left: ${left}`}</p>
}
export default SpotsLeft;