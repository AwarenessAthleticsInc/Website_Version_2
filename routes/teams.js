const Teams = require("../modules/tournament/teams");

exports.teams = (app) => {
    app.route('/api/teams').get((req, res) => {
        // get all teams
        Teams.getAll().then((teams) => {
            res.status(200).send(teams);
        }).catch(() => {
            res.status(401).send("There was an error while trying to get teams");
        });
    }).post((req, res) => {
        // add new team
        Teams.add(req.body).then(() => {
            res.status(200).send("Your team was added successfully!");
        }).catch((error) => {
            res.status(400).send("There was an error while trying to add your team");
        });
    }).put((req, res) => {
        // update exciting data
        const badArray = [];
        const array = req.body.teams;
        array.map(async (id) => {
            await Teams.update(id, req.body.data).catch((error) => {
                badArray.push(id);
            });
        });
        if(badArray.length > 0) {
            const ids = badArray.map((id) => {
                return `Team id: ${id}. `;
            });
            res.status(200).send(`There were ${badArray.length} team(s) that failed to update. All other teams updated successfully! ${ids}`);
        } else {
            res.status(200).send("All teams updated successfully!");
        }
    }).delete((req, res) => {
        // delete data 
        const badArray = [];
        const array = req.body.teams;
        array.map(async (id) => {
            await Teams.delete(id).catch((error) => {
                badArray.push(id);
            });
        });
        if (badArray.length > 0) {
            const ids = badArray.map((id) => {
                return `Team id: ${id}. `;
            });
            res.status(200).send(`There were ${badArray.length} team(s) that failed to delete. All other teams were deleted successfully! ${ids}`);
        } else {
            res.status(200).send("All teams deleted successfully!");
        }
    });

    app.route('/api/teams/:id').get((req, res) => {
        // get data
        Teams.getById(req.params.id).then((team) => {
            res.status(200).send(team);
        }).catch(() => {
            res.status(401).send("Failed to find a team with this id");
        });
    }).post((req, res) => {
        // add new data 
        res.status(405).send("Method not allowed");
    }).put((req, res) => {
        // update exciting data
        Teams.update(req.params.id, req.body).then((team) => {
            res.status(200).send("Team was updated successfully!");
        }).catch(() => {
            res.status(400).send("There was an error while trying to update this team");
        });
    }).delete((req, res) => {
        // delete data 
        Teams.delete(req.params.id).then(() => {
            res.status(200).send("Team was deleted successfully!");
        }).catch((error) => {
            res.status(401).send("Team failed to delete please try again later");
        });
    });

    app.route('/api/teamsByUser/:captain/:phone').get((req, res) => {
        // get data
        Teams.getByCapCell(req.params.captain, req.params.phone).then((teams) => {
            res.status(200).send(teams);
        }).catch((error) => {
            res.status(404).send("There was an error while trying to get your team");
        })
    }).post((req, res) => {
        // add new data 
    }).put((req, res) => {
        // update exciting data
    }).delete((req, res) => {
        // delete data 
    });
}

// require('./routes').routeName(app);