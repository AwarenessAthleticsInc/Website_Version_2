import { convertDate } from "../../UI/Converters/dateConverter";
import { monthNamesShort } from "../../../Logic";
import { monthNamesFull } from "../../../Logic";
const EventDate = (props) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dayNames = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", "13th", "14th", "15th", "16th", "17th", "18th", "19th", "20th", "21st", "22nd", "23rd", "24th", "25th", "26th", "27th", "28th", "29th", "30th", "31st"];
    var start = new Date(props.start);
    var end = new Date(props.end);
    return <h6 className="m-0">
        {start.toLocaleDateString('en-us') === end.toLocaleDateString('en-us') ?
            `${start.toLocaleDateString('en-us', options)}` : 
            `${start.toLocaleDateString('en-us', options)} - ${end.toLocaleDateString('en-us', options) }`
   }</h6>
}
export default EventDate;