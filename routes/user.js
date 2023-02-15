const User = require("../modules/users");
const Registrations = require('../modules/tournament/registrations');
const Orders = require('../modules/store/invoice');

exports.user = (app) => {
    app.route('/api/user').post(async (req, res) => {
        // get get the current session user
        if(req.session.passport.user === req.body._id) {
            const registrations = await Registrations.getByTeam(`${req.body.name.givenName} ${req.body.name.familyName}`, req.body.phone);
            const orders = await Orders.getByClientsUsername(req.body.username);
            const data = {registrationData: registrations, orderData: orders}
            res.status(200).send(data);
        } else {
           res.status(400).send("No user profile found");
        }
    }).put((req, res) => {
        // register a user
        User.register(req, res).then((user) => {
            res.status(200).send("Account created successfully!")
        }).catch((error) => {
            res.status(400).send(error);
        });
    }).delete((req, res) => {
        // delete data 
        User.logout(req).then(() => {
            res.status(200).send("Logged out");
        }).catch((error) => {
            console.log(error);
            res.status(400).send(error);
        });
    });
    app.route('/api/forgotpassword').post((req, res) => {
       //set email with forgot password link
        User.generateToke(req.body.email).then(() => {
            res.status(200).send("A password reset link was sent to your email. Please check your email to continue");
        }).catch((error) => {
            console.log(error);
            res.status(400).send(error);
        })
    });
    app.route('/reset/:token').get((req, res) => {
        //reset email password
        User.tokenCheck(req.params.token).then(() => {
            res.sendFile('/website/build/index.html', { root: './' });
        }).catch((error) => {
            res.status(400).send(error);
        })
       
    }).post((req, res) => {
        User.resetPassowrd(req.params.token, req.body.password).then(() => {
            res.status(200).send("Your password was reset!");
        }).catch((error) => {
            console.log(error);
            res.status(400).send("There was an error while trying to reset your password");
        })
    });
}

// require('./routes').user(app);