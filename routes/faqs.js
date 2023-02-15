const Faq = require("../modules/faq");

exports.faq = (app) => {
    app.route('/api/faq').get((req, res) => {
        // get data
        Faq.getAll().then((faqs) => {
            res.status(200).send(faqs);
        }).catch(() => {
            res.status(404).send("Failed to get faqs");
        });
    }).post((req, res) => {
        // add new data 
        Faq.add(req.body.question, req.body.answer).then(() => {
           res.status(200).send("FAQ was added successfully!");
        }).catch(() => {
           res.status(400).send("Failed to add this FAQ");
        });
    }).put((req, res) => {
        // update exciting data
        const badArray = [];
        const array = req.body.faqs;
        array.map(async (id) => {
            await Faq.update(id, req.body).catch((error) => {
                badArray.push(id);
            });
        });
        if (badArray.length > 0) {
            const ids = badArray.map((id) => {
                return `FAQs id: ${id}. `;
            });
            res.status(200).send(`There were ${badArray.length} Faq(s) that failed to update. All other Faq(s) were updated successfully! ${ids}`);
        } else {
            res.status(200).send("All selected Faq(s) were updated successfully!");
        }
    }).delete((req, res) => {
        // delete data 
        const badArray = [];
        const array = req.body.faqs;
        array.map(async (id) => {
            await Faq.delete(id).catch((error) => {
                badArray.push(id);
            });
        });
        if (badArray.length > 0) {
            const ids = badArray.map((id) => {
                return `FAQ id: ${id}. `;
            });
            res.status(200).send(`There were ${badArray.length} Faq(s) that failed to delete. All other Faq(s) were deleted successfully! ${ids}`);
        } else {
            res.status(200).send("All selected Faq(s) were deleted successfully!");
        }
    });


    app.route('/api/faq/:id').get((req, res) => {
        // get data
        Faq.getById(req.params.id).then((faq) => {
            res.status(200).send(faq);
        }).catch(() => {
            res.status(404).send("Failed to get this faq");
        });
    }).post((req, res) => {
        // add new data 
        res.status(405).send("Method not allowed");
    }).put((req, res) => {
        // update exciting data
        Faq.update(req.params.id, req.body).then(() => {
            res.status(200).send("FAQ was updated successfully!");
        }).catch(() => {
            res.status(400).send("There was an error while trying to update this FAQ");
        });
    }).delete((req, res) => {
        // delete data 
        Faq.delete(req.params.id).then(() => {
            res.status(200).send("FAQ was delete successfully!");
        }).catch(() => {
            res.status(400).send("There was an error while trying to delete this FAQ");
        });
    });
}

// require('./routes').routeName(app);