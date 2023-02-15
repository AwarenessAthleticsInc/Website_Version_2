const User = require("../modules/users");
const cart = require("../modules/store/cart");
const tournament = require("../modules/tournament/tournaments");
const products = require("../modules/store/products");
const registrations = require('../modules/tournament/registrations');
const Stock = require('../modules/store/stock');
const Categories = require('../modules/store/categories');
const Toc = require('../modules/tournament/toc');
const Team = require('../modules/staff');
const softballTeams = require('../modules/tournament/teams')
const Docs = require('../modules/documents');
const Faq = require('../modules/faq');
const Orders = require('../modules/store/invoice');
const Donations = require('../modules/donations');
const payment = require('../modules/payment');
const fs = require('fs');

exports.startup = (app) => {
    app.route('/api/startup').get(async (req, res) => {
        // get starting data
        var currentUser = { userData: [] };
        try {
            currentUser = await User.getById(req.session.passport.user).then((users) => {
                return { userData: users }
            }).catch(() => {
                return { userData: false };
            })
        } catch {
            currentUser = { userData: false };
        }
        const currentCart = await cart.get(req).then((array) => {
            return { cartData: array };
        }).catch(() => {
            return { cartData: [] };
        });
        const currentRegistrations = await registrations.getAll().then((array) => {
            return { RegistrationData: array };
        }).catch(() => {
            return { RegistrationData: [] };
        });
        const currentTournament = await tournament.get('all').then((array) => {
            const current = array.filter((item) => {
                const eventDate = new Date(item.dateTime.start.date);
                const today = new Date();
                return eventDate >= today;
            })
            return { tournamentData: current };
        }).catch((error) => {
            console.log(error);
            return { tournamentData: [] };
        });
        const currentProduct = await products.getAll().then((array) => {
            return { productData: array };
        }).catch(() => {
            return { productData: [] };
        });
        const currentStock = await Stock.getAll().then((array) => {
            return { stockData: array };
        }).catch(() => {
            return { stockData: [] };
        });
        const currentCategories = await Categories.getAll().then((array) => {
            return { categoryData: array };
        }).catch(() => {
            return { categoryData: [] };
        });
        const currentToc = await Toc.getCurrent().then((array) => {
            return { tocData: array };
        }).catch(() => {
            return { tocData: [] };
        });
        const currentTeam = await Team.getAll().then((array) => {
            return { teamData: array };
        }).catch(() => {
            return { teamData: [] };
        });
        const currentDocs = await Docs.getAll().then((array) => {
            return { docData: array };
        }).catch(() => {
            return { docData: [] };
        });
        const currentFaq = await Faq.getAll().then((array) => {
            return { faqData: array };
        }).catch(() => {
            return { faqData: [] };
        });
        const currentOrders = await Orders.get().then((array) => {
            return { orderData: array };
        }).catch(() => {
            return { orderData: [] };
        });
        const allUsers = await User.getAll().then((array) => {
            return { userData: array };
        }).catch(() => {
            return { userData: [] };
        });
        const currentSoftballTeams = await softballTeams.getAll().then((array) => {
            return { Data: array };
        }).catch(() => {
            return { Data: [] };
        });
        const donations = await Donations.get().then((total) => {
            return total;
        }).catch((error) => {
            console.log(error);
            return 'Not avaialable at this time';
        });
        const payments = await payment.get().then((payment) => {
            return payment 
        }).catch(() => {
            return [];
        });
        const data = {
            currentUser,
            currentCart,
            currentRegistrations,
            currentTournament,
            currentProduct,
            currentStock,
            currentCategories,
            currentToc,
            currentTeam,
            currentSoftballTeams,
            currentDocs,
            currentFaq,
            currentOrders,
            allUsers,
            donations,
            payments
        };
        res.status(200).send(data);
    }).post(async (req, res) => {
        console.log(req.body);
    });
}