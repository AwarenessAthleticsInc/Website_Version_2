const tournament = require("../modules/tournament/tournaments");
const User = require("../modules/users");
var fs = require('fs');

exports.tournaments = (app) => {
    app.route('/api/tournaments/:token').get((req, res) => {
        // get all tournaments
        tournament.get('all').then((array) => {
            const current = array.filter((item) => {
                const eventDate = new Date(item.dateTime.start.date);
                const today = new Date();
                return eventDate > today;
            })
            res.status(200).send(current);
        }).catch((error) => {
            console.log(error);
            res.status(400).send("Could not get tournaments")
        })
    }).post((req, res) => {
        // check that token is an id for an admin account 
        User.getById(req.params.token).then((user) => {
        // if yes
        // add a new tournament
           if(user.roles === "admin"){
               tournament.add(req.body).then((tournament) => {
                   res.status(200).send(tournament._id);
               });
           } else {
               res.status(401).send("You do not have permission to access this function");
           }
        }).catch(() => {
        // if no
        //send not allowed
           res.status(405).send("Invalid account token");
        });
    }).put((req, res) => {
        // check that token is an id for an admin account
        User.getById(req.params.token).then((user) => {
            // if yes
            // archive tournaments
            if (user.roles === "admin") {
                const idArray = req.body.tournaments;
                idArray.map((id) => {
                    tournament.update(id, {
                        status: "completed"
                    });
                });
                res.status(200).send("All tournaments where archived successfully!");
            } else {
                res.status(401).send("You do not have permission to access this function");
            }
        }).catch(() => {
            // if no
            //send not allowed
            res.status(405).send("Invalid account token");
        });
    }).delete((req, res) => {
        // check that token is an id for an admin account
        User.getById(req.params.token).then((user) => {
            // if yes
            // delete tournaments
            if (user.roles === "admin") {
                const idArray = req.body.tournaments;
                idArray.map(async (id) => {
                   await tournament.delete(id);
                });
                res.status(200).send("All selected tournaments where deleted successfully!");
            } else {
                res.status(401).send("You do not have permission to access this function");
            }
        }).catch(() => {
            // if no
            //send not allowed
            res.status(405).send("Invalid account token");
        });
    });

    app.route("/api/tournaments/:token/:id").get((req, res) => {
        // get one tournaments
        console.log(req.params.id);
        tournament.getById(req.params.id).then((tournament) => {
            res.status(200).send(tournament);
        }).catch((error) => {
            res.status(404).send("No tournament with this id was found");
        })
    }).post((req, res) => {
        // method not used!
        res.status(405).send("Not allowed!");
    }).put((req, res) => {
        // update one tournament
        User.getById(req.params.token).then((user) => {
            // if yes
            // archive tournaments
            if (user.roles === "admin") {
                tournament.update(req.params.id, req.body).then((tournament) => {
                    res.status(200).send("Tournament was updated successfully!");
                }).catch((error) => {
                   fs.writeFileSync('../logs/tournaments.txt', `Date: ${new Date()} , ${error} :`);
                   res.status(400).send("This tournament could not be updated at this time!");
                });
            } else {
                res.status(401).send("You do not have permission to access this function");
            }
        }).catch(() => {
            // if no
            //send not allowed
            res.status(405).send("Invalid account token");
        });
    }).delete((req, res) => {
        // delete one tournament
        User.getById(req.params.token).then((user) => {
            // if yes
            // archive tournaments
            if (user.roles === "admin") {
                tournament.delete(req.params.id).then(() => {
                   res.status(200).send("Tournament was deleted successfully!");
                }).catch((error) => {
                    res.status(200).send("Failed to delete this tournament");
                });
            } else {
                res.status(400).send("You do not have permission to access this function");
            }
        }).catch(() => {
            // if no
            //send not allowed
            res.status(405).send("Invalid account token");
        });
    });
}

// require('./routes').routeName(app);

//note admin tokens will be required in order to update, delete, add or archive a tournament