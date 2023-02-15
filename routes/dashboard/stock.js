const stock = require('../../modules/store/stock');

exports.stock = (app) => {
    app.route('/dashboard/stock').get((req, res) => {
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

    }).put((req, res) => {
        if (!req.isAuthenticated()) {
            res.redirect('/dashboard/login');
            return
        }
        // update exciting data
        stock.updateQty(req.body.id, req.body.value).then(() => {
          res.status(200).send('Stock updated successfully!');
        }).catch((error) => {
           res.status(400).send('Stock Failed to update please try again');
        });
    }).delete((req, res) => {
        if (!req.isAuthenticated()) {
            res.redirect('/dashboard/login');
            return
        }
        // delete data 
        try{
            req.body.stock.map((id) => {
                stock.delete(id).catch((error) => {
                    console.log(error);
                });
            });
            res.status(200).send('All selected stock was deleted successfully!');
        } catch(error) {
            console.log(error);
            res.status(400).send('Stock Failed to delete please try again');
        }

    });
}
