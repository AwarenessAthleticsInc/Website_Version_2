const cart = require("../modules/store/cart");
exports.cart = (app) => {
    app.route('/api/cart').get((req, res) => {
        // get cart count
        cart.get().then((cart) => {
            res.status(200).send(cart);
        }).catch((error) => {
            res.status(404).send("Cart not found");
        });
    }).post(async (req, res) => {
        // add a new items to the cart
        req.session.cart = await cart.add(req.session.cart,
            req.body.id,
            req.body.name,
            req.body.price,
            req.body.size,
            req.body.color,
            req.body.image,
            req.body.weight,
            req.body.qty
        ).then((cart) => {
            return cart;
        });
        res.status(200).send(req.session.cart);
    }).put((req, res) => {
        // update cart item count
        cart.updateCount(req.body.id, req.body.price, req.body.size, req.body.color, req.body.qty, req).then(() => {
            res.status(200).send(req.session.cart);
        }).catch((error) => {
            console.log(error);
            res.status(400).send('There was an error while trying to update this qty');
        });
    }).delete((req, res) => {
        console.log(req.session.cart);
        // remove an item from the cart
        cart.remove(req.body.id, req.body.price, req.body.size, req.body.color, req).then(() => {
            res.status(200).send("Item removed successsfully!");
        }).catch((error) => {
            console.log(error);
            res.status(400).send("There was an error while trying to delete this item from your cart");
        });
    });
}
// require('./routes').cart(app);