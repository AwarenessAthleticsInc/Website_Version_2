const users = require('../../modules/users');
const registrations = require('../../modules/tournament/registrations');

exports.registrations = (app) => {
    app.route('/dashboard/registrations').get((req, res) => {
        if (!req.isAuthenticated()) {
            res.redirect('/dashboard/login');
            return
        }
        // get data
        res.sendFile('/admin/build/index.html', { root: './' });
    }).post((req, res) => {
        users.authenticate(req.session.user._id, req.session.user.username, req).then(() => {
            registrations.get(req.body.query).then((registrations) => {
                res.status(200).send(registrations);
            }).catch((error) => {
                res.status(400).send('There was an error while trying to search registrations');
            });
        }).catch((err) => {
            res.status(403).send('Forbidden');
        });
    }).put((req, res) => {
        // update exciting data
        users.authenticate(req.session.user._id, req.session.user.username, req).then(() => {
            registrations.update(req.body._id, req.body).then((response) => {
                res.status(200).send(response);
            }).catch((error) => {
                res.status(400).send(error);
            })
        }).catch((err) => {
            res.status(403).send('Forbidden');
        });
    }).delete((req, res) => {
        try {
            req.body.registrations.map((id) => {
                registrations.delete(id).catch(() => {
                    return;
                });
            });
            res.status(200).send('All selected registrations deleted successfully!');
        } catch {
            res.status(400).send('Failed to delete all selected registrations');
        }
    });
}

// require('./routes').routeName(app);