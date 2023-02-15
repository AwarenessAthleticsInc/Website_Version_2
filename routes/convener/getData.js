const Tournament = require('../../modules/tournament/tournaments');
const Registrtaion = require('../../modules/tournament/registrations');
exports.route = (app) => {
    app.route('/api/convener/:token/get').get((req, res) => {
        checkAuthenticity(req).then(async () => {
            const tournaments = await Tournament.getByConvener(req.params.token);
            let registrations = [];
            for(const i in tournaments) {
                const reg = await Registrtaion.getByTournament(tournaments[i]._id).then((regs) => { return regs });
                registrations = [...registrations, ...reg];
            }
            const data = {
                tournaments,
                registrations
            }
            res.status(200).send(data);
        }).catch((error) => {
            if (!error.code) {
                console.log(error);
                res.status(404).send(`Can't authenticate at this time`);
            }
            if (error.code === 'login') {
                res.redirect('/login');
                return;
            }
            res.status(error.code).send(error.message);
        });
    }).post((req, res) => {
        // add new data 
    }).put((req, res) => {
        // update exciting data
    }).delete((req, res) => {
        // delete data 
    });

}


const checkAuthenticity = (req) => {
    return new Promise((resolve, reject) => {
        if (!req.isAuthenticated()) {
            reject({
                code: 'login',
                message: 'Please Login in'
            });
        }
        if (req.session.passport.user !== req.params.token) {
            reject({
                code: 403,
                message: 'Forbidden'
            });
        }
        if (req.session.passport.user !== req.params.token) {
            reject({
                code: 403,
                message: 'Forbidden'
            });
        }
        if (req.session.user.roles === 'admin' || req.session.user.roles === 'Convener') {
            resolve();
        }
    })
}