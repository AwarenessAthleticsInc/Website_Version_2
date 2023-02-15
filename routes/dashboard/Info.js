const docs = require('../../modules/documents');

exports.info = (app) => {
    app.route('/dashboard/info').get((req, res) => {
        if (!req.isAuthenticated()) {
            res.redirect('/dashboard/login');
            return
        }
        // get data
        res.sendFile('/dashboard/build/index.html', { root: './' });
    }).post((req, res) => {
        if (!req.isAuthenticated()) {
            res.redirect('/dashboard/login');
            return
        }
        // add new data 
        docs.add(req.body.doc).then(() => {
            res.status(200).send('You document was uploaded successfully!');
        }).catch((error) => {
            console.error(error);
            res.status(400).send('Failed to upload your document!');
        })
    }).put((req, res) => {
        if (!req.isAuthenticated()) {
            res.redirect('/dashboard/login');
            return
        }
        // update exciting data
        docs.update(req.body.id, req.body.doc).then(() => {
            res.status(200).send('You document was updated successfully!');
        }).catch((error) => {
            console.error(error);
            res.status(400).send('Failed to update your document!');
        })
    }).delete((req, res) => {
        if (!req.isAuthenticated()) {
            res.redirect('/dashboard/login');
            return
        }
        // delete data 
        let errors = 0;
        req.body.selected.map((id) => {
           docs.delete(id).catch((error) => {
            errors++;
            console.error(error);
           });
        });
        if(errors === 0) {
            res.status(200).send('All selected documents were deleted successfully!');
            return;
        }
        res.status(200).send(`${Number(req.body.selected.length - errors)} out of ${req.body.selected.length} were deleted successfully!`);
    });
}

// require('./routes').routeName(app);