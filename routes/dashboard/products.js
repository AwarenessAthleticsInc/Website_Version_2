const products = require('../../modules/store/products');
const stock = require('../../modules/store/stock');

exports.products = (app) => {
    app.route('/dashboard/products').get((req, res) => {
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
        products.get(req.body.query).then((products) => {
            res.status(200).send(products);
        }).catch((error) => {
            res.status(400).send(error);
        })
    }).put((req, res) => {
        if (!req.isAuthenticated()) {
            res.redirect('/dashboard/login');
            return
        }
        //add new product
        try {
            products.add(req.body.product).then((product) => {
                const productID = product._id;
                req.body.stock.map((stockItem) => {
                    stock.add(productID, stockItem.name, stockItem.size, stockItem.color, stockItem.stock).catch((error) => {
                        console.log(error);
                    });
                });
            }).catch((error) => {
                console.log(error);
                res.status(400).send(`Failed to add ${req.body.product.name} to your store. Please try again`);
            });
            res.status(200).send(`${req.body.product.name} was successfully add to your store`);
        } catch (error) {
            console.log(error);
            res.status(400).send(`Failed to add ${req.body.product.name} to your store. Please try again`);
        }

    }).delete((req, res) => {
        if (!req.isAuthenticated()) {
            res.redirect('/dashboard/login');
            return
        }
        // delete data 
        try {
            req.body.selected.map((id) => {
                products.delete(id).then((response) => {
                    res.status(200).send('Selected Products were deleted successfully.');
                }).catch((error) => {
                    res.status(400).send(error);
                });
            });
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    });
}