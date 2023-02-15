const users = require('../modules/users');
const fs = require('fs');
const donations = require('../modules/donations');
exports.donations = (app) => {
    app.route('/donations').get((req, res) => {
        // get data
        res.send('403').send("403 Not Allowed");
        //not used yet
        // users.authenticate(req.session.user._id, req.session.user.username, req).then(() => {
        //     donations.get().then((total) => {
        //         res.status(200).send(total);
        //     }).catch((error) => {
        //         res.status('400').send('There was an error while trying to get donations');
        //     });
        // }).catch((err) => {
        //     console.log(err);
        //     res.send('403').send("403 Not Allowed");
        // });
    }).post((req, res) => {
        // add new data 
        users.authenticate(req.session.user._id, req.session.user.username, req).then(() => {
            donations.update().then(() => {
                res.status(200).send('Donations updated successfully!');
            }).catch((error) => {
                res.status('400').send('There was an error while trying to update donations');
            });
        }).catch((err) => {
            console.log(err);
            res.send('403').send("403 Not Allowed");
        });
    }).put((req, res) => {
        // update exciting data
        users.authenticate(req.session.user._id, req.session.user.username, req).then(() => {
            res.send('405').send("Not Valid");
        }).catch((err) => {
            console.log(err);
            res.send('403').send("403 Not Allowed");
        });
    }).delete((req, res) => {
        // delete data 
        users.authenticate(req.session.user._id, req.session.user.username, req).then(() => {
            res.send('405').send("Not Valid");
        }).catch((err) => {
            console.log(err);
            res.send('403').send("403 Not Allowed");
        });
    });
}

// require('./routes').routeName(app);