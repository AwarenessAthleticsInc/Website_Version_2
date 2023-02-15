const tournaments = require("../modules/tournament/tournaments");
const product = require("../modules/store/products");
exports.search = (app) => {
    app.route('/api/search/:type/:query').get((req, res) => {
        // get data
        switch (req.params.type) {
            case "store":
                product.get(req.params.query).then((array) => {
                    res.status(200).send(array);
                }).catch((error) => {
                    res.status(404).send('failed to find products');
                })
                break;
            default:
                searchAll(req.params.query, res);
                break;
        }
    }).post((req, res) => {
        // add new data 
    }).put((req, res) => {
        // update exciting data
    }).delete((req, res) => {
        // delete data 
    });
}

// require('./routes').search(app);

const searchAll = (param, res) => {
    try {
        tournaments.get(param).then((array) => {
            const current = array.filter((item) => {
                const eventDate = new Date(item.dateTime.start.date);
                const today = new Date();
                return eventDate > today;
            })
            res.status(200).send(current);
        });
    } catch (error) {
        console.log(error);
        res.status(400).send("There was an error while trying to search");
    }

}