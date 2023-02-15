const shipping = require('../modules/store/shipping');


exports.shipping = (app) => {
    app.route('/test').get((req, res) => {
        // shipping.getFedexRates(address, cart).then((response) => {
        //     res.send(response);
        // });
        const cart = {
            totalWeight: 4
        }
        const address = {
            street: '19 Cottonwood Drive',
            unit: '',
            city: "Belleville",
            provinceCode: "ON",
            province: 'Ontario',
            postal: 'K8N0J3',
            country: 'Canada',
            countryCode: 'CA'
        }
        shipping.calculateShipping(address, cart).then((response) => {
            res.status(200).send(response);
        }).catch((error) => {
            console.log(error);
            res.send(error);
        });
    })

    app.route('/api/shipping/rates').get((req, res) => {
        // add new data 
        res.status(405).send("Method not allowed!");
    }).post((req, res) => {
        // get shipping rates
        shipping.calculateShipping(req.body.address, req.session.cart).then((response) => {
            res.status(200).send(response);
        }).catch((error) => {
            console.log(error);
            res.send(error);
        });
    }).put((req, res) => {
        // update exciting data
        res.status(405).send("Method not allowed!");
    }).delete((req, res) => {
        // delete data 
        res.status(405).send("Method not allowed!");
    });
}

// require('./routes').routeName(app);