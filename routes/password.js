const User = require("../modules/users");
const email = require("../modules/email");

exports.password = (app) => {
    app.route('/api/account/forgotPass/:username/:token').get((req, res) => {
        // send reset email token can be user id but is just a placeholder
        User.generateToke(req.params.username).then(() => {
            res.status(200).send("Reset email was sent. Please check your email to continue");
        }).catch((error) => {
            console.log(error);
            res.status(400).send("Failed To make token");
        });
    }).post((req, res) => {
        // reset forgot password token must be failed! 
        User.resetPassowrd(req.params.token, req.body.password).then(() => {
            res.status(200).send("Your password was reset!");
        }).catch((error) => {
            console.log(error);
            res.status(400).send("There was an error while trying to reset your password");
        });
    }).put((req, res) => {
        // change a password from old password
        User.changePassword(req.params.username, req.body.oldPassword, req.body.newPassword).then(() => {
            res.status(200).send("Password was updated successfully!");
        }).catch((error) => {
            res.status(400).send(error);
        });
    }).delete((req, res) => {
        // delete data 
        res.status(405).send("Method not allowed!");
    });
}

// require('./routes').routeName(app);