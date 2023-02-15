const Documents = require("../modules/documents");

exports.documents = (app) => {
    exports.faq = (app) => {
        app.route('/api/documents').get((req, res) => {
            // get data
            Documents.getAll().then((docs) => {
                res.status(200).send(docs);
            }).catch(() => {
                res.status(404).send("Failed to get documents");
            });
        }).post((req, res) => {
            // add new data 
            Documents.add(req.body).then(() => {
                res.status(200).send("Documents was added successfully!");
            }).catch(() => {
                res.status(400).send("Failed to add this documents");
            });
        }).put((req, res) => {
            // update exciting data
            const badArray = [];
            const array = req.body.documents;
            array.map(async (id) => {
                await Documents.update(id, req.body).catch((error) => {
                    badArray.push(id);
                });
            });
            if (badArray.length > 0) {
                const ids = badArray.map((id) => {
                    return `Documents id: ${id}. `;
                });
                res.status(200).send(`There were ${badArray.length} documents(s) that failed to update. All other document(s) were updated successfully! ${ids}`);
            } else {
                res.status(200).send("All selected document(s) were updated successfully!");
            }
        }).delete((req, res) => {
            // delete data 
            const badArray = [];
            const array = req.body.faqs;
            array.map(async (id) => {
                await Documents.delete(id).catch((error) => {
                    badArray.push(id);
                });
            });
            if (badArray.length > 0) {
                const ids = badArray.map((id) => {
                    return `Documents id: ${id}. `;
                });
                res.status(200).send(`There were ${badArray.length} Document(s) that failed to delete. All other Document(s) were deleted successfully! ${ids}`);
            } else {
                res.status(200).send("All selected Document(s) were deleted successfully!");
            }
        });


        app.route('/api/faq/:id').get((req, res) => {
            // get data
            Documents.getById(req.params.id).then((docs) => {
                res.status(200).send(docs);
            }).catch(() => {
                res.status(404).send("Failed to get this faq");
            });
        }).post((req, res) => {
            // add new data 
            res.status(405).send("Method not allowed");
        }).put((req, res) => {
            // update exciting data
            Documents.update(req.params.id, req.body).then(() => {
                res.status(200).send("Document was updated successfully!");
            }).catch(() => {
                res.status(400).send("There was an error while trying to update this document");
            });
        }).delete((req, res) => {
            // delete data 
            Documents.delete(req.params.id).then(() => {
                res.status(200).send("Document was delete successfully!");
            }).catch(() => {
                res.status(400).send("There was an error while trying to delete this document");
            });
        });
    }
}