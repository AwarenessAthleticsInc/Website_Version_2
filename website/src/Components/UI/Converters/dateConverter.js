const convertDate = (str) => {
    var array = str.split("-");
    return array[1] + "-" + array[2] + "-" + array[0];
}
const DateConverter = (props) => {
    const formatDateLong = (date) => {
        const monthNames = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var oldDate = new Date(date);
        return monthNames[oldDate.getMonth()] + " " + oldDate.getDate() + ", " + oldDate.getFullYear();
    }
    const formatDateShort = (date) => {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
        var oldDate = new Date(date);
        return monthNames[oldDate.getMonth()] + " " + oldDate.getDate() + ", " + oldDate.getFullYear();
    }
    return props.type === "short" ? formatDateShort(convertDate(props.date)) : formatDateLong(convertDate(props.date));
}
export default DateConverter;
export {convertDate}