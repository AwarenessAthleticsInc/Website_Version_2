const User = require("../modules/users");

exports.login = (app) => {
    app.route('/api/register').get((req, res) => {
        res.status(405).send("Method not used");
    }).post((req, res) => {
        // register a new user 
        User.register(req, res).then((user) => {
            res.status(200).send(user)
        }).catch((error) => {
            res.status(400).send(error);
        });
    }).put((req, res) => {
        res.status(405).send("Method not used");
    }).delete((req, res) => {
        res.status(405).send("Method not used");
    });


    app.route('/api/login').get((req, res) => {
        // login a user
        res.status(405).send("Method not used");
    }).post((req, res) => {
        // register a new user 
        User.login(req, res).then((user) => {
            res.status(200).send(user);
        }).catch((error) => {
            console.log(error);
            res.status(400).send(error);
        });
    }).put((req, res) => {
        // update user details
        res.status(405).send("Method not used");
    }).delete((req, res) => {
        // logout
        User.logout(req).then(() => {
            res.status(200).send("Logged out");
        }).catch((error) => {
            console.log(error);
            res.status(400).send(error);
        });
    });

    app.route('/api/login/:id').get((req, res) => {
        User.getById(req.params.id).then((user) => {
            res.status(200).send(user);
        }).catch((error) => {
            res.status(404).send("User not found!");
        });
    }).post((req, res) => {
        // register a new user 
        res.status(405).send("Not Allowed!");
    }).put((req, res) => {
        // update user data
        User.update(req.params.id, req.body).then(() => {
            res.status(200).send("Updates are were made successfully!");
        }).catch((error) => {
            res.status(400).send("There was an error while trying to make these updates. Please try again");
        });

    }).delete((req, res) => {
        // logout
        User.delete(req.params.id).then(() => {
            res.status(200).send("User was deleted successfully!");
        }).catch((error) => {
            res.status(400).send("Failed to delete this user");
        })
    });

}
// require('./routes').login(app);