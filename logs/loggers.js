var fs = require('fs');

// loggers 
var email = fs.createWriteStream(__dirname + '/email.txt', {
    flags: 'a' // 'a' means appending (old data will be preserved)
})
exports.email = email;

var registration = fs.createWriteStream(__dirname + '/email.txt', {
    flags: 'a' // 'a' means appending (old data will be preserved)
})
exports.registration = registration;