const path = require('path');
const { teams } = require('../../modules/tournament/events');
const users = require('../../modules/users');
exports.dashboard = (app) => {
    app.route('/dashboard').get((req, res) => {
        users.authenticate(req.session.user._id, req.session.user.username, req).then(() => {
            res.sendFile('/admin/build/index.html', { root: './' });
        }).catch((err) => {
            console.log(err);
            res.redirect('/dashboard/login');
        });
    }).post((req, res) => {
        // add new data 
    }).put((req, res) => {
        // update exciting data
    }).delete((req, res) => {
        // delete data 
    });
}

// require('./routes').dashboard(app);