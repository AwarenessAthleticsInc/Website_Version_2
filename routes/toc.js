const toc = require("../modules/tournament/toc");

exports.toc = (app) => {
    app.route('/api/toc').get((req, res) => {
        // get data
        toc.getAll().then((toc) => {
            res.status(200).send(toc);
        }).catch((error) => {
            console.log(error);
            res.status(400).send("There was an error while trying to get Tournament of champions.")
        });
    }).post(async (req, res) => {
        // add new data 
        var dates = [];
        for (const i in req.body.dates) {
            const tournament = await Tournament.tournaments.getById(req.body.dates[i]).then((events) => {
                return events;
            });
            dates.push(tournament);
        }
        toc.add(req.body.year, req.body.poster, dates, req.body.sections).then((toc) => {
            res.status(200).send("Tournament of champions for the year " + toc.year + " was added successfully!");
        }).catch((error) => {
            console.log(error);
            res.status(400).send("There was an error while trying to add this Tournament of Champions");
        })
    }).put((req, res) => {
        // update exciting data
        res.status(405).send("Method not is use");
    }).delete((req, res) => {
        // delete data 
        res.status(405).send("Method not is use");
    });

    app.route('/api/toc/:id').get((req, res) => {
        // get data
        Tournament.toc.get(req.params.id).then((toc) => {
            res.status(200).send(toc);
        }).catch((error) => {
            console.log(error);
            res.status(400).send("Failed to get this TOC");
        })
    }).post((req, res) => {
        // add new data 
        res.status(405).send("Method not allowed");
    }).put((req, res) => {
        // update exciting data
        toc.update(req.params.id, req.body).then((toc) => {
            res.status(200).send("This Tournament of Champians was updated successfully");
        }).catch((error) => {
            console.log(error);
            res.status(400).send("There was an error while trying to get Tournament of champions.")
        });
    }).delete((req, res) => {
        // delete data 
        toc.delete(req.params.id).then((toc) => {
            res.status(200).send("TOC was deleted successfully");
        }).catch((error) => {
            console.log(error);
            res.status(400).send("There was an error while trying to delete this TOC");
        })
    });

    app.route('/api/toc/:year').get((req, res) => {
        // get data
        Tournament.toc.getByYear(req.params.year).then((toc) => {
            if (toc.length < 1) {
                res.status(400).send("No event listed for this year");
                return;
            }
            res.status(200).send(toc);
        }).catch((error) => {
            console.log(error);
            res.status(400).send("There was an error while trying to get Tournament Of Champians");
        });
    }).post((req, res) => {
        // add new data 
        res.status(405).send("Method not is use");
    }).put((req, res) => {
        // update exciting data
        res.status(405).send("Method not is use");
    }).delete((req, res) => {
        // delete data 
        res.status(405).send("Method not is use");
    });

}

// require('./routes').routeName(app);