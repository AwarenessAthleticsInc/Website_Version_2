const Payment = require("../modules/payment");

exports.payments = (app) => {
    app.route('/api/payments').get((req, res) => {
    }).post((req, res) => {
        try {
            req.body.ids.map((id) => {
                Payment.add(id, 
                    req.body.paymentData ? req.body.paymentData.id : 'Manual', 
                    req.body.paymentData ? req.body.paymentData.status :  'Paid', 
                    req.body.paymentData ? req.body.paymentData.purchase_units[0].amount.value : req.body.amount, 
                    req.body.paymentData ? req.body.paymentData.purchase_units[0].amount.currency_code : 'CAD', 
                    req.body.paymentData ? req.body.paymentData.create_time : new Date().toDateString(), 
                    req.body.type).then(() => {
                    return;
                }).catch(() => {
                    return;
                });
            });
            res.status(200).send('All payments were added');
        } catch {
            res.status(400).send('Failed to update all payments');
        }
    });

    app.route('/api/payment/:type/:token').get((req, res) => {
        // get app payments
        Payments.get().then((payments) => {
            res.status(200).send(payments);
        }).catch(() => {
            res.status(404).send("Failed to get payments");
        })
    }).post((req, res) => {
        // add new payments
        Payment.add(req.body.id, req.body.payment.id, req.body.payment.status, req.body.payment.purchase_units[0].amount.value, req.body.payment.purchase_units[0].amount.currency_code, req.body.payment.create_time, req.params.type).then((payment) => {
           res.status(201).send(payment._id);
        }).catch(() => {
           res.status(400).send("Failed to add payment!");
        });
    }).put((req, res) => {
        // update all paymetns on an order
        Payments.getByOrder(req.body.orderId).then((payments) => {
            const badArray = [];
            payments.map(async (payment) => {
              await Payments.update(payment._id, req.body.data).catch(() => {
                 badArray.push(payment._id);
              });
            });
            if(badArray.length > 0) {
                res.status(200).send(`${Number(payments.length - badArray.length)} out of ${payments.length} were updated successfully! ${badArray.length} payments failed to update`);
            } else {
                res.status(200).send("All payments where updated successfully!");
            }
        }).catch(() => {
            res.status(404).send("Failed to get payments for this order");
        })
    }).delete((req, res) => {
        // delete all paymetns on an order
        Payments.deleteByOrder(req.body.orderId).then(() => {
           res.status(200).send(`All payment for order: ${req.body.orderId} have been deleted successfully!`);
        }).catch(() => {
            res.status(400).send("There was an error while trying to delete this payment");
        });
    });

    app.route('/api/payment/:type/:token/:id').get((req, res) => {
        // get one payment        
        Payments.getById(req.params.id).then((payment) => {
           if(payment.type !== req.params.type){
              res.status(400).send("Requirement not met to get this payment");
           }
           res.status(200).send(payment);
        }).catch(() => {
           res.status(404).send("Failed to find payment")
        });
    }).post((req, res) => {
        // not allowed
        res.status(405).send("Method not allowed");
    }).put((req, res) => {
        // update one payment
        Payments.update(req.params.id, req.body).then(() => {
            res.status(202).send("Payment was updated successfully!");
        }).catch(() => {
            res.status(400).send("Failed to update this payment");
        })
    }).delete((req, res) => {
        // delete one payment
        Payments.delete(req.params.id).then(() => {
            res.status(202).send("Payment was deleted successfully!");
        }).catch(() => {
            res.status(400).send("Failed to delete this payment");
        })
    });
}

// require('./routes').routeName(app);