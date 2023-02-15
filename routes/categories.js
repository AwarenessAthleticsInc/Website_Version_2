const Categories = require("../modules/store/categories");

exports.categories = (app) => {
    app.route('/api/categories').get((req, res) => {
        // get data
        Categories.getAll().then((cats) => {
          res.status(200).send(cats);
        }).catch(() => {
          res.status(404).send("Failed to get categories");
        });
    }).post((req, res) => {
        // add new data 
        Categories.add(req.body).then(() => {
            res.status(200).send("Category was added successfully!");
        }).catch(() => {
            res.status(400).send("There was an error while trying to add this category");
        });
    }).put((req, res) => {
        // update exciting data
        const array = req.body.categories;
        const badArray = [];
        array.map(async (id) => {
            await Categories.updateById(id, req.body).catch(() => {
                badArray.push(id);
            });
        });
        if (badArray.length > 0) {
            res.status(200).send(`${Number(array.length - badArray.length)} out of ${array.length} were updated successfully! ${badArray.length} Categories failed to update`);
        } else {
            res.status(200).send("All categories where updated successfully!");
        }
    }).delete((req, res) => {
        // delete data 
        const array = req.body.categories;
        const badArray = [];
        array.map(async (id) => {
            await Categories.delete(id).catch(() => {
                badArray.push(id);
            });
        });
        if (badArray.length > 0) {
            res.status(200).send(`${Number(array.length - badArray.length)} out of ${array.length} were deleted successfully! ${badArray.length} Categories failed to delete`);
        } else {
            res.status(200).send("All categories where deleted successfully!");
        }
    });

    app.route('/api/categories/:id').get((req, res) => {
        // get data
        Categories.getById(req.params.id).then((cats) => {
           res.status(200).send(cats);
        }).catch(() => {
           res.status(404).send("Failed to get this category");
        });
    }).post((req, res) => {
        // add new data 
        res.status(405).send("Method not allowed");
    }).put((req, res) => {
        // update exciting data
        Categories.updateById(req.params.id, req.body).then(() => {
            res.status(200).send("This category was updated successfully!");
        }).catch(() => {
            res.status(404).send("Failed update this category");
        });
    }).delete((req, res) => {
        // delete data 
        Categories.delete(req.params.id).then(() => {
            res.status(200).send("This category was deleted successfully!");
        }).catch(() => {
            res.status(404).send("Failed to delete this category");
        });
    });
}

// require('./routes').routeName(app);