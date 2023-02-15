const users = require('../../modules/users');

exports.users = (app) => {
    app.route('/dashboard/users').get((req, res) => {
        if (!req.isAuthenticated()) {
            res.redirect('/dashboard/login');
            return
        }
        // get data
        res.sendFile('/admin/build/index.html', { root: './' });
    }).post((req, res) => {
        if (!req.isAuthenticated()) {
            res.redirect('/dashboard/login');
            return
        }
        // add new data 
        users.search(req.body.query).then((data) => {
            res.status(200).send(data);
        }).catch((error) => {
            console.log(error);
            res.status(400).send('There was an error while trying to get users');
        });
    }).put((req, res) => {
        if (!req.isAuthenticated()) {
            res.redirect('/dashboard/login');
            return
        }
        // update user roles
        var error = 0;
        try {
            req.body.selected.map((id) => {
                users.updateRole(id, req.body.role).then(() => {
                    if (error === 0) {
                        res.status(200).send(`All selected users have been change to ${req.body.role}`);
                        return;
                    }
                    res.status(200).send(`Only ${Number(req.body.ids.length) - error} out of ${req.body.ids.length} where update to ${req.body.role} successfilly please try again`);
                }).catch((error) => {
                    console.error(error);
                    res.status(400).send('There was an error while trying to update the selected users roles');
                });
            });
        } catch (error) {
            console.error(error);
            res.status(400).send(`There was an error while trying to upodate these user(s).`);
        }

    }).delete((req, res) => {
        if (!req.isAuthenticated()) {
            res.redirect('/dashboard/login');
            return
        }
        // delete data 
        var error = 0;
        try {
            req.body.selected.map((id) => {
                users.delete(id).catch((error) => {
                    console.log(error);
                    error++
                });
            });
            if (error === 0) {
                res.status(200).send("All selected users were deleted successfully");
                return;
            }
            res.status(200).send(`Only ${Number(req.body.ids.length) - error} out of ${req.body.ids.length} where deleted successfilly please try again`);
        } catch (error) {
            console.error(error);
            res.status(400).send(`There was an error while trying to delete these user(s).`);
        }
    });

    app.route('/dashboard/user/setPassword').put((req, res) => {
        if (!req.isAuthenticated()) {
            res.redirect('/dashboard/login');
            return
        }
        users.setPassword(req.body.data.username, req.body.password).then(() => {
            res.status(200).send(`${req.body.data.name.givenName} ${req.body.data.name.familyName}'s password was update successfully!`);
        }).catch((error) => {
            console.error(error);
            res.status(400).send(`There was an error while trying to update ${req.body.data.name.givenName} ${req.body.data.name.familyName}'s password`);
        });
    });
}

// require('./routes').routeName(app);