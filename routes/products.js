const { privateDecrypt } = require("crypto");
const products = require("../modules/store/products");

exports.products = (app) => {
    app.route('/api/products/:token').get((req, res) => {
        // get all products
        products.getAll().then((array) => {
            res.status(200).send(array);
        }).catch((error) => {
            console.log(error);
            res.status(400).send("Failed to get products");
        })
    }).post((req, res) => {
        // add a new products
        products.add(req.body).then((product) => {
            res.status(200).send("Product was added successfully!");
        }).catch((error) =>  {
            res.status(400).send("Failed to add new product!");
        });
    }).put( async (req, res) => {
        // updated many products 
        const badArray = [];
        const array = req.body.items;
        await array.map(async (id) => {
          await products.update(id, req.body.data).catch((error) => {
              badArray.push(id);
           });
        });
        if(badArray.length > 0){
           const ids = badArray.map((id) => {
               return `Product id: ${id}. `;
           });
           res.status(200).send(`There were ${badArray.length} item(s) that failed to update. All other products updated successfully! ${ids}`);
        } else {
           res.status(200).send("Items updated successfully!");
        }
        
    }).delete((req, res) => {
        //
        const badArray = [];
        const array = req.body.items;
        array.map(async (id) => {
            await products.delete(id).catch((error) => {
                badArray.push(id);
            });
        });
        if (badArray.length > 0) {
            const ids = badArray.map((id) => {
                return `Product id: ${id}. `;
            });
            res.status(200).send(`There were ${badArray.length} item(s) that failed to delete. All other products deleted successfully! ${ids}`);
        } else {
            res.status(200).send("Items deleted successfully!");
        }
    });
    app.route('/api/products/:token/:id').get((req, res) => {
        // get one product
        products.getById(req.params.id).then((product) => {
            res.status(200).send(product);
        }).catch((error) => {
            res.status(404).send("Failed to find product");
        });
    }).post((req, res) => {
        res.status(405).send("Method not used!");
    }).put((req, res) => {
        // update one product
        products.update(req.params.id, req.body).then((product) => {
            res.status(202).send("Product was updated successfully!");
        }).catch((error) => {
            res.status(400).send("Failed to updated this product");
        });
    }).delete((req, res) => {
        // delete one product
        products.delete(req.params.id).then((product) => {
            res.status(200).send("product was deleted successfully!");
        }).catch((error) => {
            res.status(400).send("Failed to delete this product");
        });
    });
}

// require('./routes').products(app);

//note admin tokens will be required in order to update, delete or add a product