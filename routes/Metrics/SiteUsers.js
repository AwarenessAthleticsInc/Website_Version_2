const Users = require('../../modules/users');

exports.SiteUsers = (app) => {
    app.route('/dashboard/metrics/SiteUsersGrowth').get(async (req, res) => {
        if (!req.isAuthenticated()) {
            res.redirect('/dashboard/login');
            return
        }
        // get data
        const year = new Date().getFullYear();
        const users = await Users.getAll();
        try {
            const years = [];
            for (var i = 0; i < 5; i++) {
                years.push(year + i === 2022 ? {
                    0: [], //Jan
                    1: [], // Feb
                    2: [], //Mar
                    3: [], //Apr
                    4: [], //May
                    5: [], //June
                    6: [], //July
                    7: [], //Aug
                    8: [], //Sept
                    9: [], //Oct
                    10: [], //Nov
                    11: [], //Dev
                    12: [] //Other
                } : {
                    0: [], //Jan
                    1: [], // Feb
                    2: [], //Mar
                    3: [], //Apr
                    4: [], //May
                    5: [], //June
                    6: [], //July
                    7: [], //Aug
                    8: [], //Sept
                    9: [], //Oct
                    10: [], //Nov
                    11: [], //Dev
                });
            }
            const allowedYears = [];
            for (var i = 0; i < 5; i++) {
                const yearDifferance = new Date().getFullYear() - i;
                allowedYears.push(yearDifferance);
            }
            allowedYears.map((yearArray) => {
                users.map((user) => {
                    const StartingDate = new Date(user.startDate);
                    const yearIndex = new Date().getFullYear() - yearArray;
                    if (StartingDate.toDateString() === 'Invalid Date' && yearArray === 2022) {
                        years[yearIndex][12].push(user);
                        return;
                    }
                    if (StartingDate.getFullYear() !== yearArray) {
                        return;
                    }
                    years[yearIndex][StartingDate.getMonth()].push(user);
                });
            });
            res.status(200).send(years);
        } catch (error) {
            console.error(error);
            res.status(400).send('There was an error while trying to get the registrtaion metrics');
        }
    });
}