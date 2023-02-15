const Staff = require("../modules/staff");

exports.routeName = (app) => {
    app.route('/api/staff').get((req, res) => {
        // get data
        Staff.getAll().then((staff) => {
            res.status(200).send(staff);
        }).catch((error) => {
            res.status(404).send("Failed to get staff files");
        });
    }).post((req, res) => {
        // add new data 
        Staff.add(req.body).then(() => {
            res.status(200).send("Staff member was added successfully!");
        }).catch(() => {
            res.status(400).send("Failed to add staff member");
        })
    }).put((req, res) => {
        // update exciting data
        const array = req.body.staff;
        const badArray = [];
        array.map(async (id) => {
           await Staff.update(id, req.body.data).catch(() => {
               badArray.push(id);
           });
        });
        if(badArray.length > 0) {
           res.status(200).send(`${Number(array.length - badArray.length)} out of ${array.length} were updated successfully! ${badArray.length} staff files failed to update`);
        } else {
          res.status(200).send("All Staff where updated successfully!");
        }
    }).delete((req, res) => {
        // delete data 
        const array = req.body.staff;
        const badArray = [];
        array.map(async (id) => {
            await Staff.delete(id).catch(() => {
                badArray.push(id);
            });
        });
        if (badArray.length > 0) {
            res.status(200).send(`${Number(array.length - badArray.length)} out of ${array.length} staff files were deleted successfully! ${badArray.length} staff files failed to delete`);
        } else {
            res.status(200).send("All selected staff where deleted successfully!");
        }
    });

    app.route('/api/staff/:id').get((req, res) => {
        // get data
        Staff.getById(req.params.id).then((staff) => {
            res.status(200).send(staff);
        }).catch((error) => {
            res.status(404).send("Staff not found");
        });
    }).post((req, res) => {
        // add new data 
        res.status(405).send("Method not used");
    }).put((req, res) => {
        // update exciting data
        Staff.update(req.params.id, req.body).then(() => {
            res.status(200).send("Update successful!");
        }).catch(() => {
            res.status(400).send("There was an error while trying to update this staff file");
        });
    }).delete((req, res) => {
        // delete data 
        Staff.delete(req.params.id).then(() => {
            res.status(200).send("Staff file was deleted successful!");
        }).catch(() => {
            res.status(400).send("There was an error while trying to delete this staff file");
        });
    });
}

// require('./routes').routeName(app);