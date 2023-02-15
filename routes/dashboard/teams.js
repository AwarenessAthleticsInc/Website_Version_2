const path = require('path');
const users = require('../../modules/users');
const teams = require('../../modules/tournament/teams');

exports.teams = (app) => {
    app.route('/dashboard/teams').get((req, res) => {
        if (!req.isAuthenticated()) {
            res.redirect('/dashboard/login');
            return
        }
        // get data
        res.sendFile('/admin/build/index.html', { root: './' });
    }).post((req, res) => {
        // serach teams
        try {
            users.authenticate(req.session.user._id, req.session.user.username, req).then(() => {
                teams.get(req.body.query).then((teams) => {
                    res.status(200).send(teams);
                }).catch((error) => {
                    console.log(error);
                    res.status(400).send("Failed to search teams");
                });
            }).catch((err) => {
                console.log(err);
                res.redirect('/dashboard/login');
            });
        } catch {
            res.redirect('/dashboard/login');
        }

    }).put((req, res) => {
        // update selected teams
        if (!req.isAuthenticated()) {
            res.redirect('/dashboard/login');
            return
        }
        // update team data
        teams.update(req.body.id, req.body.team.team, req.body.team.captain, req.body.team.cell, req.body.team.email, req.body.team.status).then(() => {
            res.status(200).send(`The team ${req.body.team.team} was updated successfully!`); 
        }).catch((error) => {
            console.error(error);
            res.status(400).send('There was an error while trying to update this team');
        })
    }).delete((req, res) => {
        // delete all selected teams
        users.authenticate(req.session.user._id, req.session.user.username, req).then(() => {
            try {
                req.body.teams.map((id) => {
                    teams.delete(id).then(() => {
                        return;
                    }).catch((error) => {
                        console.log(error);
                    });
                });
                res.status(200).send('All selected team(s) were deleted successfully!');
            } catch (error) {
                res.status(400).send("Failed to delete all team(s) selected");
            }
        }).catch((err) => {
            console.log(err);
            res.redirect('/dashboard/login');
        });
    });
}