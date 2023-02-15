require("dotenv").config();
require('events').EventEmitter.setMaxListeners();
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const fs = require("fs");
const passport = require("passport");
const passportLM = require("passport-local-mongoose");
const mongoStore = require("connect-mongo");
const mongoose = require('mongoose');
const app = express();
const cluster = require("cluster");
const compression = require('compression');
const multer = require("multer");
const sharp = require("sharp");
const storage = multer.memoryStorage();
const upload = multer({ storage });
const os = require("os");
const NumCpu = os.cpus().length;
const path = require('path');

//modules ******************************************************
const User = require(__dirname + "/modules/users");
const Store = require(__dirname + "/modules/store/store");
const Tournament = require(__dirname + "/modules/tournament/events");
const Payment = require(__dirname + "/modules/payment");
const Documents = require(__dirname + "/modules/documents");
const Faq = require(__dirname + "/modules/faq");
const Staff = require(__dirname + "/modules/staff");
const Email = require(__dirname + "/modules/email");
const email = require(__dirname + "/modules/email");
const Registration = require('./modules/tournament/registrations');
/**
 * Archive Old Tournaments
 */ 

// mongoose connection picker ***********************************
var connection = process.env.NODE_ENV === "development" ?
  connection = process.env.LOCAL_CONNECTION :
  connection = process.env.MONGOOSE_CONNECTION;


// app setup ***************************************************
app.use(compression());

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: mongoStore.create({
    mongoUrl: connection,
    ttl: 14 * 24 * 60 * 60
  }),
  cookie: {
    secure: false, //change this when production is done { secure: true }
    maxAge: 5184000000 // 60 days
  }
}));
app.use(passport.initialize());
app.use(passport.session());


// mongoose connection ******************************************
mongoose.set('strictQuery', false);
mongoose.connect(connection, {
  useNewUrlParser: true
});

//passport ******************************************************
passport.use(User.model.createStrategy());
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  User.model.findById(id, function (err, user) {
    done(err, user);
  });
});
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'website/build')));
app.use(express.static(path.join(__dirname, 'admin/build')));
app.use(express.static(path.join(__dirname, 'conveners/build')));
app.use(express.static(path.join(__dirname, 'assets')));

// react get routes 
app.get('/', function (req, res) {
  console.log(req.headers['user-agent']);
  res.sendFile(path.join(__dirname, 'website/build', 'index.html'));
});
app.get('/tournaments', function (req, res) {
  res.sendFile(path.join(__dirname, 'website/build', 'index.html'));
});
app.get('/store', function (req, res) {
  res.sendFile(path.join(__dirname, 'website/build', 'index.html'));
});
app.get('/tournament-of-champions', function (req, res) {
  res.sendFile(path.join(__dirname, 'website/build', 'index.html'));
});
app.get('/about-us', function (req, res) {
  res.sendFile(path.join(__dirname, 'website/build', 'index.html'));
});
app.get('/rules-info', function (req, res) {
  res.sendFile(path.join(__dirname, 'website/build', 'index.html'));
});
app.get('/account', function (req, res) {
  res.sendFile(path.join(__dirname, 'website/build', 'index.html'));
});
app.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, 'website/build', 'index.html'));
});
app.route('/dashboard').get((req, res) => {
  res.sendFile('/admin/build/index.html', { root: './' });
});

app.route('/conveners/:route/:token').get((req, res) => {
  res.sendFile('/conveners/build/index.html', { root: './' });
});

// admin rountes
require('./routes/Metrics/Teams').TeamGrowth(app);
require('./routes/Metrics/SiteUsers').SiteUsers(app);
require('./routes/Metrics/Registrations').RegistrationGrowth(app);
require('./routes/dashboard/dashboard').dashboard(app);
require('./routes/dashboard/teams').teams(app);
require('./routes/dashboard/registrations').registrations(app);
require('./routes/dashboard/toc').toc(app);
require('./routes/dashboard/upload').upload(app);
require('./routes/dashboard/tournaments').tournaments(app);
require('./routes/dashboard/orders').orders(app);
require('./routes/dashboard/products').products(app);
require('./routes/dashboard/stock').stock(app);
require('./routes/dashboard/users').users(app);
require('./routes/dashboard/Faq').faq(app);
require('./routes/dashboard/Info').info(app);
require('./routes/dashboard/staff').staff(app);

// general routes 
require('./routes/donations').donations(app);
require('./routes/login').login(app);
require('./routes/cart').cart(app);
require('./routes/products').products(app);
require('./routes/registration').registrations(app);
require('./routes/stocks').stock(app);
require('./routes/search').search(app);
require('./routes/tournaments').tournaments(app);
require('./routes/user').user(app);
require('./routes/password').password(app);
require('./routes/teams').teams(app);
require('./routes/assets').assets(app);
require("./routes/documents").documents(app);
require("./routes/faqs").faq(app);
require("./routes/categories").categories(app);
require('./routes/payments').payments(app);
require('./routes/orders').orders(app);
require('./routes/toc').toc(app);
require('./routes/startup').startup(app);
require('./routes/shipping').shipping(app);
require('./routes/contact').contact(app);
require('./routes/convener/convenerRoutes').routes(app);

app.post("/download", (req, res) => {
  // console.log(req.body);
  res.download("../assets" + req.body.file);
});

// listener ******************************************************
if (cluster.isMaster) {
  //functions that only run once should be placed here
  require('./modules/archiveTournaments').startArchiveTimer();
  require('./modules/priceChangeAdjuster').startPriceAdjustTimer()
  for (var i = 0; i < NumCpu; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, singal) => {
    // console.log("worker " + worker.process.pid + " died");
    cluster.fork();
  })
} else {
  if (process.env.NODE_ENV === "development") {
    app.listen(5000, function (err) {
      if (err) {
        console.log(err);
        return;
      }
      console.log("Started PID: " + process.pid + " @ localhost:5000");
    });
  } else {
    app.listen(function (err) {
      if (err) {
        console.log(err);
      }
    });
  }
}
