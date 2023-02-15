const orders = require('../../modules/store/invoice');

exports.orders = (app) => {
    app.route('/dashboard/orders').get((req, res) => {
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
        // add new data 
       
    }).put((req, res) => {
        if (!req.isAuthenticated()) {
            res.redirect('/dashboard/login');
            return
        }
        // update order marking
        var errors = 0;
        req.body.orders.map((id) => {
            orders.updateStatus(id, req.body.marking).catch((err) => {
                console.log(err);
                errors++;
            });
        });
        if(errors > 0) {
            res.status(200).send(`${error} orders could not be updated. Please try again`);
        }
        res.status(200).send(`All selected orders have an updated status of ${req.body.marking}`);

    }).delete((req, res) => {
        if (!req.isAuthenticated()) {
            res.redirect('/dashboard/login');
            return
        }
        // delete data 
        try {
            req.body.selected.map((id) => {
            orders.delete(id).then((response) => {
              res.status(200).send(response);
            }).catch((error) => {
                res.status(400).send(error);
            })
            });
        } catch(error) {
            console.log(error);
            res.status(400).send(error);
        }
    });
}