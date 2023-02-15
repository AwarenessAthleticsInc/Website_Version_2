const Stock = require("../modules/store/stock");

exports.stock = (app) => {
    app.route('/api/stock/:token').get((req, res) => {
        // get all stock items
        Stock.getAll().then((stock) => {
            res.status(200).send(stock);
        }).catch((error) => {
            res.status(400).send("Failed to get stock at this time please check your internet connection and try again");
        });
    }).post((req, res) => {
        // add new stock item
        Stock.add(req.body.productId, req.body.name, req.body.size, req.body.color, req.body.stock).then((stock) => {
            res.status(200).send("Stock added successfully!");
        }).catch((error) => {
            res.status(400).send("Failed to add this stock item");
        });
    }).put((req, res) => {
        // update many exciting stock items
        const badArray = [];
        const array = req.body.items;
        array.map(async (id) => {
            await Stock.update(id, req.body.data.ProductId, req.body.data.name, req.body.data.size, req.body.data.color, req.body.data.qty).catch((error) => {
               badArray.push(id);
            });
        });
        if(badArray.length > 0) {
            const ids = badArray.map((id) => {
                return `Product id: ${id}. `;
            });
            res.status(200).send(`${badArray.length} stock item(s) failed to udpated. The rest updated successfully! ${ids}`);
        } else {
            res.status(200).send("All stock items were updated successsfully!");
        }
    }).delete((req, res) => {
        // delete many exciting stock items
        const badArray = [];
        const array = req.body.items;
        array.map(async (id) => {
            await Stock.delete(id).catch((error) => {
                badArray.push(id);
            });
        });
        if (badArray.length > 0) {
            const ids = badArray.map((id) => {
                return `Product id: ${id}. `;
            });
            res.status(200).send(`${badArray.length} stock item(s) failed to delete. The rest deleted successfully! ${ids}`);
        } else {
            res.status(200).send("All stock items were deleted successsfully!");
        }
    });

    app.route('/api/stock/:token/:stockId').get((req, res) => {
        // get one stock item
        Stock.getById(req.params.stockId).then((stock) => {
            res.status(200).send(product);
        }).catch((error) => {
            res.status(400).send("There was an error while trying to get details for this product")
        })
    }).post((req, res) => {
        // sell a stock item
        res.status(405).send("Method not used!");
    }).put((req, res) => {
        // update one stock item
        Stock.update(req.params.stockId, req.body.ProductId, req.body.name, req.body.size, req.body.color, req.body.qty).then(() => {
            res.status(200).send("Stock item was updated successfully!");
        }).catch((error) => {
            res.status(400).send("There was an error while trying to update this stock element!");
        })
    }).delete((req, res) => {
        // delete one stock item
        Stock.delete(req.params.stockId).then(() => {
            res.status(200).send("This stock item was deleted succesfully!");
        }).catch((error) => {
            res.status(400).send("There was an error while trying to delete this stock item");
        });
    });

    app.route('/api/stock/:token/item/:itemId').get((req, res) => {
        // get all stock elements for the product id
        stock.getByProduct(req.params.itemId).then((stock) => {
            res.status(200).send(stock);
        }).catch((error) => {
            res.status(400).send("There was an error while trying to get stock for this item");
        });
    }).post((req, res) => {
        res.status(405).send("Method not used");
    }).put((req, res) => {
        // update all stock elements for the product id
        res.status(405).send("Method not used");
    }).delete((req, res) => {
        // delete all stock elements for the product id
        badArray = [];
        stock.getByProduct(req.params.itemId).then((stock) => {
            stock.map(async (stock) => {
               await Stock.delete(stock._id).catch(() => {
                  badArray.push(stock._id);
               });
            });
            if (badArray.length > 0) {
                const ids = badArray.map((id) => {
                    return `Product id: ${id}. `;
                });
                res.status(200).send(`${badArray.length} stock item(s) failed to delete. The rest deleted successfully for this item! ${ids}`);
            } else {
                res.status(200).send("All stock items were deleted successsfully for this item!");
            }
        }).catch((error) => {
            res.status(400).send("There was an error while trying to delete stock for this item");
        });
    });
}

// require('./routes').routeName(app);