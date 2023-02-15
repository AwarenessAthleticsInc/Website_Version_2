const users = require('../../modules/users');
const Tournament = require('../../modules/tournament/events');
exports.toc = (app) => {
    app.route('/dashboard/toc').get((req, res) => {
        if (!req.isAuthenticated()) {
            res.redirect('/dashboard/login');
            return
        }
        // get data
        res.sendFile('/admin/build/index.html', { root: './' });
    }).post(async (req, res) => {
        // add new data 
        var dates = [];
        for (const i in req.body.dates) {
            const tournament = await Tournament.tournaments.getById(req.body.dates[i]).then((events) => {
                return events;
            });
            dates.push(tournament)
        }
        const year = new Date(dates[0].dateTime.start.date).getFullYear();

        Tournament.toc.add(year, req.body.poster, dates, req.body.sections).then((toc) => {
            res.status(200).send("Tournament of champions for the year " + toc.year + " was added successfully!");
        }).catch((error) => {
            console.log(error);
            res.status(400).send("There was an error while trying to add this Tournament of Champions");
        });
    }).put((req, res) => {
        try {
            users.authenticate(req.session.user._id, req.session.user.username, req).then(() => {
                // update exciting data
                toc.update(req.body.id, req.body.data).then((toc) => {
                    res.status(200).send("This Tournament of Champians was updated successfully");
                }).catch((error) => {
                    console.log(error);
                    res.status(400).send("There was an error while trying to get Tournament of champions.")
                });
            }).catch((err) => {
                res.redirect('/dashboard/login');
            });
        } catch {
            res.redirect('/dashboard/login');
        }
    }).delete((req, res) => {
        var error = 0;
        try {
            req.body.ids.map((id) => {
                Tournament.toc.delete(id).catch((error) => {
                    console.log(error);
                    error++
                });
            });
            if(error === 0) {
                res.status(200).send("All selected TOCs were deleted successfully");
                return;
            }
            res.status(200).send(`Only ${Number(req.body.ids.length) - error} out of ${req.body.ids.length} where deleted successfilly please try again`);
        } catch(error) {
          res.status(400).send(`There was an error while trying to delete these TOC(s). ${error}`);
        }
    });
}

// require('./routes').toc(app);