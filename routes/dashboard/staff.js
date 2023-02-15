const staff = require('../../modules/staff');

exports.staff = (app) => {
    app.route('/dashboard/staff').get((req, res) => {
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
        staff.add(req.body.staff).then(() => {
           res.status(200).send(`${req.body.staff.details.name.givenName} ${req.body.staff.details.name.familyName} was added to your staff list`);
        }).catch((error) => {
          console.error(error);
          res.status(400).send('There was an error while trying to add this staff member')
        });
    }).put((req, res) => {
        if (!req.isAuthenticated()) {
            res.redirect('/dashboard/login');
            return
        }
        // update exciting data
        staff.update(req.body.id ,req.body.staff).then(() => {
            res.status(200).send(`${req.body.staff.details.name.givenName} ${req.body.staff.details.name.familyName} was updated successfully!`);
        }).catch((error) => {
            console.error(error);
            res.status(400).send('There was an error while trying to update this staff member')
        });
    }).delete((req, res) => {
        if (!req.isAuthenticated()) {
            res.redirect('/dashboard/login');
            return
        }
        // delete data 
        let errors = 0;
        req.body.selected.map((id) => {
          staff.delete(id).catch((error) => {
            console.error(error);
            errors++;
          })
        });
        if (errors === 0) {
            res.status(200).send('All selected staff member were deleted successfully!');
            return;
        }
        res.status(200).send(`${Number(req.body.selected.length - errors)} out of ${req.body.selected.length} were deleted successfully!`);
    });
}

// require('./routes').routeName(app);