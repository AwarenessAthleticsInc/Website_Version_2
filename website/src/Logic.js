import $ from "jquery";
const monthNamesShort = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
export {monthNamesShort}
const monthNamesFull = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export {monthNamesFull}
const dayNames = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", "13th", "14th", "15th", "16th", "17th", "18th", "19th", "20th", "21st", "22nd", "23rd", "24th", "25th", "26th", "27th", "28th", "29th", "30th", "31st"];

const formatDateLong = (date) => {
    const monthNames = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var oldDate = new Date(date);
    return monthNames[oldDate.getMonth()] + " " + oldDate.getDate() + ", " + oldDate.getFullYear();
}
export {formatDateLong};

const formatDateShort = (date) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    var oldDate = new Date(date);
    return monthNames[oldDate.getMonth()] + " " + oldDate.getDate() + ", " + oldDate.getFullYear();
}
export {formatDateShort};

const formatTournamentDate = (date) => {
    var eventDate = date.split("-");
    var date = new Date(eventDate[1] + "-" + eventDate[2] + "-" + eventDate[0]);
    return dayNames[date.getDate() - 1];
}
export {formatTournamentDate};

const formatDateString = (str) => {
    var array = str.split("-");
    return array[1] + "-" + array[2] + "-" + array[0];
}
export {formatDateString};



const get = (url, data) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "GET",
            url: url,
            data: data,
            success: function (data) {
                resolve(data);
            },
            error: function (error) {
                reject(error);
            }
        });
    })
}
export { get };

const POST = (url, data) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: url,
            data: data,
            success: function (data) {
                resolve(data);
            },
            error: function (error) {
                reject(error);
            }
        });
    })
}
export {POST};

const PUT = (url, data) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "PUT",
            url: url,
            data: data,
            success: function (data) {
                resolve(data);
            },
            error: function (error) {
                reject(error);
            }
        });
    })
}
export {PUT};

const PATCH = (url, data) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "PATCH",
            url: url,
            data: data,
            success: function (data) {
                resolve(data);
            },
            error: function (error) {
                reject(error);
            }
        });
    })
}
export {PATCH}

const DELETE = (url, data) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "DELETE",
            url: url,
            data: data,
            success: function (data) {
                resolve(data);
            },
            error: function (error) {
                reject(error);
            }
        });
    })
}
export {DELETE};

const UPLOAD = (url, data) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: url,
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 600000,
            success: function (data) {
                resolve(data);
            },
            error: function (error) {
                reject(error);
            }
        });
    })
}
export {UPLOAD}

let bubbleSort = (inputArr) => {
    let len = inputArr.length;
    let checked;
    do {
        checked = false;
        for (let i = 0; i < len; i++) {
            if (inputArr[i] > inputArr[i + 1]) {
                let tmp = inputArr[i];
                inputArr[i] = inputArr[i + 1];
                inputArr[i + 1] = tmp;
                checked = true;
            }
        }
    } while (checked);
    return inputArr;
};
export {bubbleSort};