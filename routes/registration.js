const Registration = require("../modules/tournament/registrations");
const Tournament = require("../modules/tournament/events");
const Payment = require('../modules/payment');
const email = require('../modules/email');
const logger = require('../logs/loggers');

exports.registrations = (app) => {
    app.route('/api/register/:token').get((req, res) => {
        // get all registrations
        User.getById(req.params.token).then((user) => {
            if (user.roles === "admin") {
                // send all 
            } else {
                // end just once the relate to the token
            }
        }).catch(() => {
            res.status(405).send("Invalid account token");
        });
    }).post(async (req, res) => {
        // add new registration
        const team = {
            team: req.body.team,
            captain: req.body.captain,
            cell: req.body.cell,
            email: req.body.email,
            status: req.body.status,
            message: req.body.comments,
            division: req.body.division,
            newTeam: req.body.newTeam
        }
        //does team exist ?
        const tournament = await Tournament.tournaments.getById(req.body.tournamentId);
        // false means not new true means new
        const check = await Tournament.registrations.getByEventAndTeam(tournament._id, team.cell).then((events) => {
            for (var i = 0; i < events.length; i++) {
                if (!events[i].team.division) {
                    return false;
                }
                if (events[i].team.division === team.division) {
                    return false;
                }
            }
            return true;
        }).catch((error) => {
            return true;
        });
        if (check === false) {
            res.status(412).send("Your team as already registered for this event(and/or division)");
        } else {
            // register the new team
            if (team.status.includes("new")) {
                const data = {
                    team: team.team,
                    captain: team.captain,
                    cell: team.cell,
                    email: team.email,
                    status: "Good",
                    message: team.message,
                    division: team.division,
                    startDate: new Date()
                }
                Tournament.teams.add(data);
            }
            Tournament.registrations.add(tournament, team).then((registration) => {
                try {
                    if (process.env.NODE_ENV !== 'development') {
                        email.EmailTournamentReceipt(registration);
                        email.EmailTournamentNotification(registration);
                    }
                } catch (error) {
                    logger.email.write(error);
                    console.log(error);
                }
                if (req.body.payment) {
                    // add payment
                    try {
                        Payment.add(registration._id, req.body.payment.id, req.body.payment.status, req.body.payment.purchase_units[0].amount.value, req.body.payment.purchase_units[0].amount.currency_code, req.body.payment.create_time, "paypal");
                    } catch (error) {
                        email.sendEmail("emma@spfacanada.ca", "Payment error on line 73 routes/registration.js", error, error);
                    }
                }
                res.status(200).send('"' + team.team + '" was registered ! Invoice: ' + registration._id);
            }).catch((error) => {
                console.log(error);
                res.status(400).send("There was an unexpected error while trying to register your team");
            });
        } 
    }).put((req, res) => {
        // update many registrations
        User.getById(req.params.token).then((user) => {
            if (user.roles === "admin") {
                const idArray = req.body.registrations;
                idArray.map(async (id) => {
                    //function here!!!*******************************************************
                    Registration.update(id, req.body.data).then(() => {
                       res.status(200).send("all registrations have been updated!");
                    }).catch((error) => {
                       res.status(401).send("There was and error while trying to complete this task");
                    });
                });
            } else {
                res.status(401).send("You do not have permission to access this function");
            }
        }).catch(() => {
            res.status(405).send("Invalid account token");
        });
    }).delete((req, res) => {
        // delete many registrations
        User.getById(req.params.token).then((user) => {
            if (user.roles === "admin") {
                const idArray = req.body.tournaments;
                idArray.map(async (id) => {
                   await istion.delete(id);
                });
                res.status(200).send("All selected registrations where deleted successfully!");
            } else {
                res.status(401).send("You do not have permission to access this function");
            }
        }).catch(() => {
            res.status(405).send("Invalid account token");
        });
    });

    app.route('/api/register/:token/:id').get((req, res) => {
        // get one registration
        Registration.getById(req.params.id).then((reg) => {
           res.status(200).send(reg);
        }).catch((error) => {
           res.status(401).send("failed to find registration");
        });
    }).post((req, res) => {
        // method not used!
        res.status(405).send("Not allowed!");
    }).put((req, res) => {
        // update one registrtaion
        Registration.update(req.params.id, req.body).then(() => {
            res.status(200).send("Registration was updated succesfully!");
        }).catch((error) => {
            res.status(401).send("There was an  error while trying to update this registration");
        })
    }).delete((req, res) => {
        // delete one registration
        User.getById(req.params.token).then((user) => {
            if (user.roles === "admin") {
                Registration.delete(req.params.id).then((registration) => {
                    res.status(200).send("registrtaion deleted succesfully!");
                }).catch((error) => {
                    res.status(401).send("There was an error while trying to delete this registration.");
                });
            } else {
                res.status(400).send("You do not have permission to access this function");
            }
        }).catch(() => {
            res.status(405).send("Invalid account token");
        });
    });

    app.route('/api/getRegsByTournament/:id').get((req, res) => {
        Registration.getByTournament(req.params.id).then((registrations) => {
            res.status(200).send(registrations);
        }).catch((error) => {
            console.log(error);
            res.status(400).send(error);
        });
    }).post((req, res) => {
        // add new data 
        res.status(405).send("Method not allowed");
    }).put((req, res) => {
        // update all registrtaion under this event
        //example zero out balance after event

    }).delete((req, res) => {
        // delete all registrtaion under this event
    });

    app.route('/api/register/user/:userId/:tournamentId').get((req, res) => {
        // get data
        Registration.CheckRegistered(req.params.userId, req.params.tournamentId).then((regs) => {
            if(regs === null) {
                res.status(200).send(false);
            } else {
                res.status(200).send(true);
            }
        }).catch((error) => {
            console.log(error);
            res.status(200).send(false);
        });
    }).post((req, res) => {
        // add new data 
        res.status(405).send("Method not allowed");
    }).put((req, res) => {
        // update all registrtaion under this event
        //example zero out balance after event

    }).delete((req, res) => {
        // delete all registrtaion under this event
    });


    app.post('/api/registrationCheck/withoutDivision', (req, res) => {
        Registration.getByEventAndTeam(req.body.eventId, req.body.cell).then((data) => {
            res.status(200).send(data);
        }).catch((error) => {
            console.log(error);
            res.status(200).send(false);
        })
    });
    app.post('/api/registrationCheck/withDivision', (req, res) => {
        Registration.getByEventAndTeamDivision(req.body.eventId, req.body.cell, req.body.division).then((data) => {
            res.status(200).send(data);
        }).catch((error) => {
            console.log(error);
            res.status(200).send(false);
        })
    });

    app.post('/api/registrations/byUser', (req, res) => {
       Registration.getByTeam(req.body.captain, req.body.cell).then((events) => {
           res.status(200).send(events);
       }).catch((error) => {
           console.log(error);
           res.status(404).send("Nothing found");
       })
    });
}

// require('./routes').routeName(app);