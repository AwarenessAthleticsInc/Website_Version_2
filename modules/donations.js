const fs = require('fs');

exports.get = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('./assets/donations.txt', 'utf8', (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
}
exports.update = (total) => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./assets/donations.txt', total, err => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
}