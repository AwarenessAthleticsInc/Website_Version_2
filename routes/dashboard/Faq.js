const faq = require('../../modules/faq');

exports.faq = (app) => {
    app.route('/dashboard/faq').get((req, res) => {
        if (!req.isAuthenticated()) {
            res.redirect('/dashboard/login');
            return
        }
        res.sendFile('/dashboard/build/index.html', { root: './' });
    }).post((req, res) => {
        if (!req.isAuthenticated()) {
            res.redirect('/dashboard/login');
            return
        }
        faq.add(req.body.faq).then(() => {
            res.status(200).send(`FAQ was added successfully!`);
        }).catch((error) => {
            console.error(error);
            res.status(200).send(`There was an error while trying to add this new FAQ`);
        });
    }).put((req, res) => {
        if (!req.isAuthenticated()) {
            res.redirect('/dashboard/login');
            return
        }
        // update exciting data
        faq.update(req.body.id, req.body.faq).then(() => {
          res.status(200).send(`FAQ was updated successfully!`);
        }).catch((error) => {
            console.error(error);
            res.status(200).send(`There was an error while trying to add this new FAQ`);
        });
    }).delete((req, res) => {
        if (!req.isAuthenticated()) {
            res.redirect('/dashboard/login');
            return
        }
        // delete data 
        let error = 0;
        req.body.selected.map((id) => {
            faq.delete(id).catch((error) => {
               error++;
               console.log(error);
            });
        });
        if(error === 0) {
            res.status(200).send('All select Faqs were deleted successfully!');
            return;
        } 
        res.status(200).send(`${Number(req.body.selected.length - error)} out of ${Number(req.body.selected.length)} were deleted successfully!`);
    });
}

// require('./routes').routeName(app);