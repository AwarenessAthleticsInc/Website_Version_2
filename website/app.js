require("dotenv").config();
require('events').EventEmitter.setMaxListeners();
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const fs = require("fs");
const passport = require("passport");
const passportLM = require("passport-local-mongoose");
const mongoStore = require("connect-mongo");
const mongoose = require('mongoose');
const Chart = require('chart.js');
const path = require('path');
const http = require('http');
const app = express();
const cluster = require("cluster");
const compression = require('compression');
const multer = require("multer");
const sharp = require("sharp");
const storage = multer.memoryStorage();
const upload = multer({ storage });
const os = require("os");
const NumCpu = os.cpus().length;

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
// mongoose connection picker ***********************************
var connection = "";
if (process.env.NODE_ENV === "development") {
  connection = process.env.LOCAL_CONNECTION;
} else {
  connection = process.env.MONGOOSE_CONNECTION;
}

// app setup ***************************************************
app.set("view engine", "ejs");
app.use(compression());
app.use(express.static(__dirname + "/assets"));
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/views/forms"));
app.use(express.static(__dirname + "/node_modules"));
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({
  extended: true
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
mongoose.connect(connection, {
  useNewUrlParser: true
});

//passport ******************************************************
passport.use(User.model.createStrategy());
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.model.findById(id, function(err, user) {
    done(err, user);
  });
});

// routes ********************************************************
app.route("/").get((req, res) => {
  res.render("viewPages/home/index");
}).post(async (req, res) => {
});
app.route("/login").get((req, res) => {
  res.render("memberPages/login")
}).post((req, res) => {
  // login
  User.login(req, res).then(() => {
    res.status(200).send("Login successful!");
  }).catch((error) => {
    console.log(error);
    res.status(400).send(error);
  });
}).put((req, res) => {
  // Create
  User.register(req, res).then((user) => {
    res.status(200).send("Account created successfully!")
  }).catch((error) => {
    res.status(400).send(error);
  });
}).delete((req, res) => {
  // logout
  User.logout(req).then(() => {
    res.status(200).send("Logged out");
  }).catch((error) => {
    console.log(error);
    res.status(400).send(error);
  });
});
app.route("/register").get((req, res) => {
  res.render("memberPages/register")
}).post((req, res) => {
  console.log(req.body);
  return;
  User.register(req, res).then((user) => {
    res.status(200).send("Account created successfully!")
  }).catch((error) => {
    res.status(400).send(error);
  });
});
app.get("/logout", (req, res) => {
  User.logout(req).then(() => {
    res.redirect("/");
  }).catch((error) => {
    console.log(error);
  });
})
app.get("/tournament-of-champions", (req, res) => {
  res.render("viewPages/tournaments/toc/toc");
});
app.get("/about-us", (req, res) => {
  res.render("viewPages/about-us/about-us", {
    donations: process.env.DONATION
  });
})
app.post("/contact-us", (req, res) => {
  const html = "<h6> " + req.body.name + " asked: </h6>" +
    "<p>" + req.body.message + "</p>" +
    "<p>You can respond to this message at " + req.body.email + "</p>";
  const text = req.body.name + " asked: \n" +
    req.body.message + "\n" +
    "You can responsed to this message at " + req.body.email + "\n";
  Email.sendEmail("info@spfacanada.ca", req.body.subject, text, html, req.body.email).then((email) => {
    res.status(200).send("Your message was send successfully!");
  }).catch((error) => {
    console.log(error);
    res.status(400).send("Your message failed to send. If this is important please contact us directly at info@spfacanada.ca");
  })
});
app.get("/rules-info", (req, res) => {
  res.render("viewPages/info/info");
});
app.post("/rules-info", (req, res) => {
  res.download(__dirname + "/assets" + req.body.fileName);
})

app.route("/users/forgotPass").get(function(req, res) {
  res.render("memberPages/forgotPassword/forgotPass");
}).post(async function(req, res) {
  User.generateToke(req.body.username).then(() => {
    res.status(200).send("Reset email was sent. Please check your email to continue");
  }).catch((error) => {
    console.log(error);
    res.status(400).send("Failed To make token");
  })
});
app.route("/reset/:token").get(async function(req, res) {
   User.tokenCheck(req.params.token).then(() => {
     res.render("memberPages/resetPassword/resetPassword", {
       token: req.params.token
     });
   }).catch((error) => {
     res.status(400).send(error);
   })
}).post(async function(req, res) {
   User.resetPassowrd(req.params.token, req.body.password).then(() => {
      res.status(200).send("Your password was reset!");
   }).catch((error) => {
     console.log(error);
     res.status(400).send("There was an error while trying to reset your password");
   })
});
//asset Managment Routes ***********************************************
app.post("/upload/:type", upload.single("filetoupload"), (req, res) => {
    uploadFile(req.params.type, req.file, 500).then((path) => {
      res.status(200).send(path);
    }).catch((error) => {
      console.log(error);
      res.status(400).send("Couldn't upload your file");
    });
});

// tournament routes ***************************************************
app.route("/tournaments").get((req, res) => {
  res.render("viewPages/tournaments/list/tournaments");
})
app.route("/tournaments/:id").get(async (req, res) => {
  res.render("viewPages/tournaments/page/tournaments", {
    id: req.params.id
  });
});
app.route("/tournament/register").get((req, res) => {
  res.render("viewPages/tournaments/finalize/final");
}).post(async (req, res) => {
  const team =  {
    team: req.body.team.team,
    captain: req.body.team.captain,
    cell: req.body.team.cell,
    email: req.body.team.email,
    status: req.body.team.status || "",
    message: req.body.team.message || "",
    division: req.body.team.division || "",
  }
  //does team exist ?
  const tournament = await Tournament.tournaments.getById(req.body.tournament);
  // false means not new true means new
  const check = await Tournament.registrations.getByEventAndTeam(tournament._id, team.cell).then((events) => {
    for (var i = 0; i < events.length; i++) {
      if (!events[i].team.division) {
        return false;
      }
      if (events[i].team.division === team.division) {
        return false;
      }
    }
    return true;
  }).catch((error) => {
    return true;
  });
  if (check === false) {
    res.status(400).send("Your team as already registered for this event(and/or division)");
  } else {
    // register the new team
    if (team.status.includes("new")) {
      const data = {
        team: team.team,
        captain: team.captain,
        cell: team.cell,
        email: team.email,
        status: "Good",
        message: team.message,
        division: team.division
      }
      Tournament.teams.add(data);
    }
    Tournament.registrations.add(tournament, team).then((registration) => {
      try {
        email.EmailTournamentReceipt(registration);
        email.EmailTournamentNotification(registration);
      } catch (error) {
        console.log(error);
      }
      if(req.body.payment) {
        // add payment
        try {
          Payment.add(registration._id, req.body.payment.id, req.body.payment.status, req.body.payment.purchase_units[0].amount.value, req.body.payment.purchase_units[0].amount.currency_code, req.body.payment.create_time, "paypal");
        } catch(error) {
          email.sendEmail("emma@spfacanada.ca", "Payment error on line 247 app.js", error, error);
        }
      }
      res.status(200).send('"' + team.team + '" was registered ! Invoice: ' + registration._id);
    }).catch((error) => {
      console.log(error);
      res.status(400).send("There was an unexpected error while trying to register your team");
    });
  }
}).put((req, res) => {
  // get current team status
  if (req.session.team) {
    res.status(200).send(req.session.team.status);
  }
  res.status(400).send("No Team currenly sessioned");
});
app.get("/tournament/register/payments/:id", (req, res) => {
  res.render("viewPages/confirmationPages/payment", {
    invoice: req.params.id
  });
});
app.get("/tournament/register/emt/:id", (req, res) => {
  res.render("viewPages/confirmationPages/emt", {
    invoice: req.params.id
  });
});
app.get("/tournament/register/finale/:id", (req, res) => {
  res.render("viewPages/confirmationPages/finale", {
    invoice: req.params.id
  });
});
app.post("/tournament/register/payments/:type", async (req, res) => {
  const account = {
    _id: req.session.user._id,
    name: {
      givenName: req.session.user.name.givenName,
      familyName: req.session.user.name.familyName
    },
    username: req.session.user.username
  }
  switch (req.params.type) {
    case "paypal":
      req.session.team.message = req.body.message;
      if (req.session.team.status.includes("new")) {
        Tournament.teams.updateStatus(req.session.team._id, "Good");
      }
      const registration = await Tournament.registrations.add(account, req.session.tournament, req.session.team).then((registration) => {
        email.EmailTournamentReceipt(registration);
        email.EmailTournamentNotification(registration);
        return registration;
      }).catch((error) => {
        console.log(error);
      });
      // update team status to good if new
      if (req.session.team.status.includes("new")) {
        Tournament.teams.updateStatus(req.session.team._id, "Good");
      }
      Payment.add(registration._id, req.body.payment.id, req.body.payment.status, req.body.payment.purchase_units[0].amount.value, req.body.payment.purchase_units[0].amount.currency_code, req.body.payment.create_time, "paypal").then((payment) => {
        req.session.team = null;
        req.session.tournament = null;
        res.status(200).send(registration._id);
      }).catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
      break;
    case "emt":
      req.session.team.message = req.body.message;
      if (req.session.team.status.includes("new")) {
        Tournament.teams.updateStatus(req.session.team._id, "Good");
      }
      Tournament.registrations.add(account, req.session.tournament, req.session.team).then((registration) => {
        email.EmailTournamentReceipt(registration);
        email.EmailTournamentNotification(registration);
        req.session.team = null;
        req.session.tournament = null;
        res.status(200).send(registration._id);
      });
      break;
    case "finale":
      req.session.team.message = req.body.message;
      if (req.session.team.status.includes("new")) {
        Tournament.teams.updateStatus(req.session.team._id, "Good");
      }
      Tournament.registrations.add(account, req.session.tournament, req.session.team).then((registration) => {
        email.EmailTournamentReceipt(registration);
        email.EmailTournamentNotification(registration);
        req.session.team = null;
        req.session.tournament = null;
        res.status(200).send(registration._id);
      }).catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
      break;
  }
});
app.post("/tournament/add", (req, res) => {
  Tournament.tournaments.add(req.body).then((tournament) => {
    res.status(200).send(tournament.location.city + " on the " + tournament.dateTime.start.date + " was added successfully");
  }).catch((error) => {
    console.log(error);
    res.status(400).send("Failed to add this event. Please check your connection and try again");
  })
})
app.post("/tournament/update", (req, res) => {
  Tournament.tournaments.update(req.body.id, req.body.data).then((tournament) => {
    res.status(200).send(tournament.location.city + " on the " + tournament.dateTime.start.date + " was updated successfully");
  }).catch((error) => {
    console.log(error);
    res.status(400).send("Failed to add this event. Please check your connection and try again");
  })
})

//dashboard Routes ******************************************************
app.route("/dashboard/tournaments/toc").get((req, res) => {
  res.render("adminPages/toc/view/toc");
}).post((req, res) => {
  Tournament.toc.getAll().then((toc) => {
    res.status(200).send(toc);
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to get Tournament of champions.")
  });
});
app.route("/dashboard/tournaments/toc/edit/:id").get((req, res) => {
  res.render("adminPages/toc/edit/toc", {
    id: req.params.id
  });
}).post((req, res) => {
  // post edits to toc
  Tournament.toc.update(req.body.id, req.body.data).then((toc) => {
    res.status(200).send("This Tournament of Champians was updated successfully");
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to get Tournament of champions.")
  });
});
app.route("/dashboard/tournaments/toc/new").get((req, res) => {
  res.render("adminPages/toc/new/toc");
}).post(async (req, res) => {
  // post to add a new toc
  var dates = [];
  for (const i in req.body.dates) {
    const tournament = await Tournament.tournaments.getById(req.body.dates[i]).then((events) => {
      return events;
    });
    dates.push(tournament)
  }
  Tournament.toc.add(req.body.year, req.body.poster, dates, req.body.sections).then((toc) => {
    res.status(200).send("Tournament of champions for the year " + toc.year + " was added successfully!");
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to add this Tournament of Champions");
  })
})
app.post("/dashboard/tournaments/toc/delete", (req, res) => {
  Tournament.toc.delete(req.body.id).then((toc) => {
    res.status(200).send("TOC was deleted successfully");
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to delete this TOC");
  })
})
app.route("/dashboard/teams").get((req, res) => {
  res.render("adminPages/teams/view/teams");
}).post((req, res) => {
  Tournament.teams.getAll().then((teams) => {
    res.status(200).send(teams);
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to get all teams");
  });
});
app.route("/dashboard/teams/new").get((req, res) => {
  res.render("adminPages/teams/new/teams");
}).post((req, res) => {
  // create new team
  var data = {
    team: req.body.team,
    captain: req.body.captain,
    cell: req.body.cell,
    email: req.body.email,
    status: "new"
  }
  Tournament.teams.add(data).then((team) => {
    res.status(200).send("The team " + team.team + " was added successfully!");
  }).catch((error) => {
    console.log(error);
    res.status(400).send("Failed to add this team");
  });
});
app.route("/dashboard/teams/edit/:id").get((req, res) => {
  res.render("adminPages/teams/edit/teams", {
    id: req.params.id
  });
}).post((req, res) => {
  // update a team
  Tournament.teams.update(req.body.id, req.body.name, req.body.captain, req.body.cell, req.body.email, req.body.status).then((team) => {
    res.status(200).send("The team " + team.team + " was updated successfully!");
  }).catch((error) => {
    console.log(error);
    res.status(400).send("Failed to update this team");
  });
});
app.post("/dashboard/teams/delete", (req, res) => {
  Tournament.teams.delete(req.body.id).then(() => {
    res.status(200).send("This team was deleted successfully!");
  }).catch((error) => {
    res.status(400).send("There was an error while trying to delete this team");
  })
});
app.route("/dashboard/orders").get((req, res) => {
  res.render("adminPages/store/orders/view/orders");
}).post((req, res) => {
  Store.orders.get().then((orders) => {
    res.status(200).send(orders);
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to get orders")
  })
});
app.route("/dashboard/orders/view/:id").get((req, res) => {
  res.render("adminPages/store/orders/edit/orders", {
    id: req.params.id
  });
}).post((req, res) => {
  Store.orders.getById(req.body.id).then((order) => {
    res.status(200).send(order);
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to get details for invoice " + req.body.id);
  })
});
app.post("/dashboard/orders/delete", (req, res) => {
  Store.orders.delete(req.body.id).then((order) => {
    res.status(200).send("The order with the id " + req.body.id + " was deleted successfully!");
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to delete the order with the id of " + req.body.id);
  })
})
app.post("/dashboard/payments/new", (req, res) => {
  Payment.add(req.body.Invoice, req.body.id, req.body.status, req.body.amount, req.body.currency, req.body.date, req.body.type).then((payment) => {
    res.status(200).send("Payment was add successfully!");
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to add this payment");
  })
});
app.route("/dashboard/registration").get((req, res) => {
  res.render("adminPages/registrations/view/registration");
}).post((req, res) => {
  Tournament.registrations.getAll().then((registrations) => {
    res.status(200).send(registrations);
  }).catch((error) => {
    console.log(error);
    res.status(200).send("There was an error while trying to get the registrations");
  });
});
app.route("/dashboard/registrations/view/:id").get((req, res) => {
  res.render("adminPages/registrations/edit/registration", {
    id: req.params.id
  });
}).post((req, res) => {
  Tournament.registrations.getById(req.params.id).then((registration) => {
    res.status(200).send(registration);
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to get this registration");
  })
})
app.post("/dashboard/registrations/delete", (req, res) => {
  Tournament.registrations.delete(req.body.id).then(() => {
    res.status(200).send("Registrtaion was deleted successfully!");
  }).catch((error) => {
    console.log(error);
    res.status(400).send("Failed to delete this registration");
  })
});
app.route("/dashboard/users").get((req, res) => {
  res.render("adminPages/users/view/users")
}).post((req, res) => {
  User.getAll().then((users) => {
    res.status(200).send(users);
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to get users");
  })
});

app.post("/dashboard/users/delete", (req, res) => {
  User.delete(req.body.id).then((response) => {
    res.status(200).send(response);
  }).catch((error) => {
    console.log(error);
    res.status(400).send(error.responseText);
  })
});
app.route("/dashboard/products").get((req, res) => {
  // render the product page
  res.render("adminPages/store/products/view/products");
}).post((req, res) => {
  // get all the products
  Store.product.getAll().then((products) => {
    res.status(200).send(products);
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to get products");
  })
}).put((req, res) => {
  Store.stock.getByProduct(req.body.id).then((stock) => {
    var total = 0;
    for (const i in stock) {
      total += Number(stock[i].stock)
    }
    res.status(200).send(String(total));
  }).catch((error) => {
    console.log(error);
    res.status(400).send("Fail to get stock for this item");
  })
}).delete((req, res) => {
  // delete a product
  Store.product.delete(req.body.id).then(() => {
    Store.stock.deleteByProduct(req.body.id).then(() => {
      res.status(200).send("This Product was deleted successfully!");
    }).catch((error) => {
      console.log(error);
      res.status(400).send("Fail to delete stock for this product. Please delete stock manually");
    })

  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to delete this product");
  });
});
app.route("/dashboard/store/products/edit/:id").get((req, res) => {
  // render product page
  res.render("adminPages/store/products/edit/products");
}).post((req, res) => {
  // get product details
  Store.product.getById(req.params.id).then((product) => {
    res.status(200).send(product);
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to get details for this product")
  })
}).put((req, res) => {
  // get stock for this item
  Store.stock.getByProduct(req.params.id).then((stock) => {
    res.status(200).send(stock);
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to get stock for this item");
  });
}).patch(async (req, res) => {
  // update product information
  try {
    const porudct = await Store.product.update(req.params.id, req.body.product).then((product) => {
      return product
    });
    const deleteStock = await Store.stock.deleteByProduct(req.params.id).then((product) => {
      return product
    });
    for (const i in req.body.stock) {
      const stock = await Store.stock.add(req.params.id, req.body.stock[i].name, req.body.stock[i].size, req.body.stock[i].color, req.body.stock[i].stock).then((stock) => {
        return stock;
      });
    }
    res.status(200).send("product was updated successfully!");
  } catch (error) {
    console.log(error);
    res.status(400).send("There was an error while trying to update this product");
  }
});
app.route("/dashboard/products/new").get((req, res) => {
  res.render("adminPages/store/products/new/products");
}).post(async (req, res) => {
  // add new product
  try {
    const product = await Store.product.add(req.body.product).then(async (product) => {
      return product
    });
    for (const i in req.body.stock) {
      const stock = await Store.stock.add(product._id, req.body.stock[i].name, req.body.stock[i].size, req.body.stock[i].color, req.body.stock[i].stock).then((stock) => {
        return stock;
      });
    }
    res.status(200).send("Product was add successfully!");
  } catch (error) {
    console.log(error);
    res.status(400).send("There was an error while trying to add this product");
  }
})
app.route("/dashboard/stock").get((req, res) => {
  // render stock page
  res.render("adminPages/store/stock/view/stock");
}).post((req, res) => {
  // get all stock items
  Store.stock.getAll().then((stock) => {
    res.status(200).send(stock);
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to get stock");
  })
}).put((req, res) => {
  // update stock value and label
  Store.stock.updateQty(req.body.id, req.body.stock).then(() => {
    res.status(200).send("update successful");
  }).catch((error) => {
    res.status(400).send("Fail to update stock value");
  })
})
app.route("/dashboard/categories").get((req, res) => {
  // render category page
  res.render("adminPages/store/categories/view/categories");
}).post((req, res) => {
  // get all categories
  Store.category.getAll().then((categories) => {
    res.status(200).send(categories);
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to get categories");
  })
}).delete((req, res) => {
  // delete one category
  Store.category.delete(req.body.id).then(() => {
    res.status(200).send("Category was deleted successfully");
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to delete this category");
  })
});
app.route("/dashboard/categories/edit/:id").get((req, res) => {
  // get edit page
  res.render("adminPages/store/categories/edit/categories");
}).post((req, res) => {
  // get details for category
  Store.category.getById(req.params.id).then((category) => {
    res.status(200).send(category);
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to get details for this category");
  });
}).put((req, res) => {
  // update cetgory information
  Store.category.updateById(req.params.id, req.body).then(() => {
    res.status(200).send("Category was updated successfully!");
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to update this category");
  })
});
app.route("/dashboard/categories/new").get((req, res) => {
  res.render("adminPages/store/categories/new/categories");
}).post((req, res) => {
  Store.category.add(req.body).then(() => {
    res.status(200).send("Category was added successfully!");
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to add this category");
  })
});
app.route("/dashboard/documents").get((req, res) => {
  // render docs page
  res.render("adminPages/documents/view/documents");
}).post((req, res) => {
  // get all docs
  Documents.getAll().then((docs) => {
    res.status(200).send(docs);
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to get your public documents");
  })
}).delete((req, res) => {
  // delete one doc
  Documents.delete(req.body.id).then(() => {
    res.status(200).send("Document was deleted successfully!");
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to delete this document!");
  })
})
app.route("/dashboard/documents/edit/:id").get((req, res) => {
  // render document page
  res.render("adminPages/documents/edit/documents");
}).post((req, res) => {
  // get document details
  Documents.getById(req.params.id).then((doc) => {
    res.status(200).send(doc);
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to get details for this document");
  })
}).put((req, res) => {
  // update document
  Documents.update(req.params.id, req.body).then(() => {
    res.status(200).send("Document was updated successfully");
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to update this document");
  });
});
app.route("/dashboard/documents/new").get((req, res) => {
  // render page
  res.render("adminPages/documents/new/documents");
}).post((req, res) => {
  // add new document
  Documents.add(req.body).then(() => {
    res.status(200).send("Document was added successfully");
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to add this document");
  })
})
app.route("/dashboard/faq").get((req, res) => {
  // render faq list
  res.render("adminPages/faq/view/faq");
}).post((req, res) => {
  // get all faqs
  Faq.getAll().then((faq) => {
    res.status(200).send(faq);
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to get FAQs");
  })
}).delete((req, res) => {
  // delete one faq
  Faq.delete(req.body.id).then(() => {
    res.status(200).send("FAQ was deleted successfully");
  }).catch((error) => {
    console.log(error);
    res.status(400).send("Failed to delete this FAQ");
  })
})
app.route("/dashboard/faq/edit/:id").get((req, res) => {
  res.render("adminPages/faq/edit/faq");
}).post((req, res) => {
  Faq.getById(req.params.id).then((faq) => {
    res.status(200).send(faq);
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to get details for this FAQ");
  })
}).put((req, res) => {
  Faq.update(req.params.id, req.body).then(() => {
    res.status(200).send("FAQ was updated successfully");
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to update this FAQ");
  })
});
app.route("/dashboard/faq/new").get((req, res) => {
  res.render("adminPages/faq/new/faq");
}).post((req, res) => {
  Faq.add(req.body).then(() => {
    res.status(200).send("FAQ was added successfully!");
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to add this FAQ");
  })
});
app.route("/dashboard").get((req, res) => {
  if (req.session.user.roles === "admin") {
    res.render("adminPages/dashboard/dashboard");
  } else {
    res.redirect("/");
  }
})
app.route("/dashboard/tournaments").get((req, res) => {
  res.render("adminPages/tournaments/view/tournament");
}).post(async (req, res) => {
  console.log(req.body);
  var team = []
  //does team exist ?
  const findTeam = await Tournament.teams.getByCapCell(req.body.team.captain, req.body.team.cell).then((team) => {
    return team;
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to get your team information. This issue has been logged and we will correct its a soon as possible");
  });
  if (findTeam.length > 0 && findTeam[0] !== null) {
    team = {
      _id: findTeam[0]._id,
      userID: req.session.user._id,
      team: req.body.team.team,
      captain: findTeam[0].captain,
      cell: findTeam[0].cell,
      email: findTeam[0].email,
      status: findTeam[0].status
    }
  } else {
    var data = {
      team: req.body.team.team,
      captain: req.body.team.captain,
      cell: req.body.team.cell,
      email: req.body.team.email,
      status: "Good"
    }
    // if no
    // add new team and move on
    // console.log("team was NOT found");
    team = await Tournament.teams.add(data).then((team) => {
      return team
    }).catch((error) => {
      console.log(error);
      res.status(400).send("There was an error while trying to add a new team");
    })
  }
  var tournament = await Tournament.tournaments.getById(req.body.tournament).then((tournament) => {
    return tournament
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error wile trying to get the tournament details");
  });
  console.log(tournament.dateTime.start.date);
  const account = {
    _id: req.session.user._id,
    name: {
      givenName: req.session.user.name.givenName,
      familyName: req.session.user.name.familyName
    },
    username: req.session.user.username
  }
  const regTourny = {
    _id: tournament._id,
    assets: {
      poster: tournament.assets.poster
    },
    location: {
      city: tournament.location.city,
      diamond: tournament.location.diamond,
      province: tournament.location.province,
      FullAddress: tournament.location.FullAddress
    },
    dateTime: {
      start: {
        date: tournament.dateTime.start.date,
        time: tournament.dateTime.start.time
      },
      end: {
        date: tournament.dateTime.end.date,
        time: tournament.dateTime.end.time
      }
    },
    variation: tournament.variation,
    cost: tournament.cost,
    tournamentType: tournament.tournamentType,
    notes: tournament.notes,
    division: req.body.division || ""
  }
  const regTeam = {
    _id: team._id,
    userID: team.userID,
    team: team.team,
    captain: team.captain,
    cell: team.cell,
    email: team.email,
    status: team.status,
    message: req.body.message
  }
  // false means not new true means new
  const check = await Tournament.registrations.getByEventAndTeam(tournament._id, team._id).then((team) => {
    for (var i = 0; i < team.length; i++) {
      if (!team[i].tournament.division) {
        return false;
      }
      if (team[i].tournament.division === tournament.division) {
        return false;
      }
      return true;
    }
  }).catch((error) => {
    return true;
  })
  if (check === false) {
    res.status(400).send("This team as already registered for this event(and/or division)");
  } else {
    // registrtaion a team here **********
    const registration = await Tournament.registrations.add(account, regTourny, regTeam).then((reg) => {
      return reg;
    }).catch((error) => {
      console.log(error);
      res.status(400).send("Failed to register this team");
    });
    console.log(registration);
    email.EmailTournamentReceipt(registration);
    res.status(200).send(registration.team.team + " was registered successfully!");
  }
}).delete((req, res) => {
  Tournament.tournaments.delete(req.body.id).then(() => {
    res.status(200).send("Tournament was deleted successfully");
  }).catch((error) => {
    console.log(error);
    res.status(400).send("Failed to delete this tournament");
  })
});
app.route("/dashboard/tournaments/new").get((req, res) => {
  res.render("adminPages/tournaments/new/tournament")
})
app.route("/dashboard/tournaments/edit/:id").get((req, res) => {
  res.render("adminPages/tournaments/edit/tournament", {
    id: req.params.id
  });
}).post((req, res) => {

});
app.post("/registrations/team/update", (req, res) => {
  var data = {
    team: req.body.team,
    captain: req.body.captain,
    cell: req.body.cell,
    email: req.body.email,
    message: req.body.notes
  }
  Tournament.registrations.updateTeamInfo(req.body.id, data).then(() => {
    res.status(200).send("Team was updated successfully");
    }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to update this team");
  })
})
// staff *****
app.route("/dashboard/staff/new").get((req, res) => {
  // render the page
  res.render("adminPages/staff/new/staff");
}).post((req, res) => {
  // add the new staff member
  Staff.add(req.body).then((staff) => {
    res.status(200).send(staff.details.name.givenName + " was added successfully");
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to add this team member");
  })
})
app.route("/dashboard/staff").get((req, res) => {
  res.render("adminPages/staff/view/staff");
}).post((req, res) => {
  Staff.getAll().then((staff) => {
    res.status(200).send(staff);
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to get staff");
  })
});
app.route("/dashboard/staff/edit/:id").get((req, res) => {
  res.render("adminPages/staff/edit/staff");
}).post((req, res) => {
  Staff.getById(req.params.id).then((staff) => {
    res.status(200).send(staff);
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to get data for this team member");
  });
}).put((req, res) => {
  Staff.update(req.params.id, req.body).then((staff) => {
    res.status(200).send(staff.details.name.givenName + "'s profile was updated successfully!'");
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to update this staff member");
  });
});
app.post("/dashboard/staff/delete", (req, res) => {
  Staff.delete(req.body.id).then(() => {
    res.status(200).send("Team member was removed successfully!");
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to delete this team member");
  });
});
// store routes **********************************************************
app.get("/store", (req, res) => {
  res.render("viewPages/store/main/products");
});
app.get("/product/:id", (req, res) => {
  res.render("viewPages/store/product/product", {
    id: req.params.id
  })
});
app.route("/store/catagory/:id").get((req, res) => {
  res.render("viewPages/store/category/category", {
    id: req.params.id
  });
}).post(async (req, res) => {
  const category = await Store.category.getById(req.params.id).then((cat) => {
    return cat;
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to get categories");
  });
  const products = [];
  for (var i = 0; i < category.products.length; i++) {
    const product = await Store.product.getById(category.products[i]).then((product) => {
      return product;
    }).catch((error) => {
      console.log(error);
      res.status(400).send("There was an error while trying to get proudcts");
    });
    products.push(product);
  }
  res.status(200).send({
    category: category,
    products: products
  });
});
app.route("/cart").get((req, res) => {
  res.render("viewPages/store/cart/cart");
}).post(async (req, res) => {
  req.session.cart = await Store.cart.add(req.session.cart, req.body.id, req.body.name, req.body.price, req.body.size, req.body.color, req.body.image, req.body.weight, 1).then((cart) => {
    return cart;
  });
  req.session.save((error) => {
    if ((error) => {
        res.status(400).send("Fail to session your cart please ensure your web browser accepts cookies");
      });
  });
  res.status(200).send("Item added to cart");
});
app.post("/cart/remove", (req, res) => {
  Store.cart.remove(req.body.id, req.body.price, req.body.size, req.body.color, req).then(() => {
    res.redirect("/cart");
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to delete this item from your cart");
  })
});
app.route("/checkout").get((req, res) => {
  res.render("viewPages/store/checkout/checkout");
});
app.get("/cart/checkout/:type/complete/:id", (req, res) => {
  switch (req.params.type) {
    case "emt":
      res.render("viewPages/confirmationPages/emt", {
        invoice: req.params.id
      });
      break;
    case "paypal":
      res.render("viewPages/confirmationPages/payment", {
        invoice: req.params.id
      });
      break;
    default:

  }
})
// data gathering routes
app.post("/store/products/get", (req, res) => {
  Store.product.getAll().then((products) => {
    res.status(200).send(products);
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to get products");
  });
});
app.post("/store/categories/get", (req, res) => {
  Store.category.getAll().then((cats) => {
    if (cats.length < 1) {
      res.status(400).send("No Categories found");
      return;
    }
    res.status(200).send(cats);
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to get categories");
  })
});
app.post("/store/products/get/:id", (req, res) => {
  Store.product.getById(req.params.id).then((product) => {
    res.status(200).send(product);
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to get this product");
  })
});
app.post("/store/stock/get/:id", (req, res) => {
  Store.stock.getByProduct(req.params.id).then((stock) => {
    res.status(200).send(stock);
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to get stock for this product");
  })
})
app.post("/tournaments/get", (req, res) => {
  Tournament.tournaments.get("all").then((events) => {
    res.status(200).send(events);
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to get tournamnets");
  });
});
app.post("/tournaments/getCurrent", (req, res) => {
  Tournament.tournaments.getCurrent().then((events) => {
    res.status(200).send(events);
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to get tournamnets");
  });
})
app.post("/tournaments/search/:query", (req, res) => {
  Tournament.tournaments.get(req.params.query).then((events) => {
    res.status(200).send(events);
  }).catch((error) => {
    console.log(error);
    res.status("400").send("To tournaments found");
  })
});
app.post("/registrations/search/:query", (req, res) => {
  Tournament.registrations.get(req.params.query).then((data) => {
    res.status(200).send(data);
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to get registrations");
  });
});
app.post("/store/search/:query", (req, res) => {
  Store.product.get(req.params.query).then((products) => {
    if (products.length < 1) {
      res.status(404).send("No Products Found")
    }
    res.status(200).send(products);
  }).catch((error) => {
    console.log(error);
    res.status(400).send("failed to get products");
  })
});
app.post("/tournaments/get/byID/:id", (req, res) => {
  Tournament.tournaments.getById(req.params.id).then((tournament) => {
    res.status(200).send(tournament);
  }).catch((error) => {
    console.log(error);
    res.status(400).send("Failed to load this event");
  })
})
app.post("/registrations/get/:id", (req, res) => {
  Tournament.registrations.getByTournament(req.params.id).then((regs) => {
    res.status(200).send(regs);
  }).catch((error) => {
    console.log(error);
    res.status(400).send(error);
  });
});
app.post("/registrtaions/get", (req, res) => {
  Tournament.registrations.getByTeam(req.body.captain, req.body.cell).then((regs) => {
    res.status(200).send(regs);
  }).catch((error) => {
    console.log(error);
    res.status(400).send("Failed to get registrations");
  })
});
app.post("/user/get", (req, res) => {
  User.get(req).then((user) => {
    res.status(200).send(user);
  }).catch((error) => {
    console.log(error);
    res.status(200).send("no");
  })
})
app.post("/teams/get/users", (req, res) => {
  if (req.isAuthenticated()) {
    Tournament.teams.getByUser(req.session.user._id).then((teams) => {
      res.status(200).send(teams);
    }).catch((error) => {
      res.status(400).send("There was an error while trying to get teams. Please check your internet connection and try again");
    })
  } else {
    res.status(400).send("No user is not logged on currently");
  }
});
app.post("/teams/search/:query", (req, res) => {
  Tournament.teams.get(req.params.query).then((teams) => {
    res.status(200).send(teams);
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to find teams");
  })
})
app.post("/team/status/get", (req, res) => {
  Tournament.teams.getByCapCell(req.body.captain, req.body.cell).then((team) => {
    res.status(200).send(team[0].status);
  }).catch((error) => {
    res.status(200).send("new");
  });
});
app.post("/session/get", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).send(req.session);
  } else {
    res.status(400).send("Not autherized!");
  }
})
app.post("/toc/get/:year", (req, res) => {
  Tournament.toc.getByYear(req.params.year).then((toc) => {
    if (toc.length < 1) {
      res.status(400).send("No event listed for this year");
    }
    res.status(200).send(toc);
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to get Tournament Of Champians");
  })
})
app.post("/toc/get/byID/:id", (req, res) => {
  Tournament.toc.get(req.params.id).then((toc) => {
    res.status(200).send(toc);
  }).catch((error) => {
    console.log(error);
    res.status(400).send("Failed to get this TOC");
  })
})
app.post("/cart/get", (req, res) => {
  Store.cart.get(req).then((cart) => {
    res.status(200).send(cart);
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to get your cart");
  });
})
app.post("/cart/checkout/shipping", async (req, res) => {
  Store.shipping.calculateShipping(req.body.postal, req.body.country, req.session.cart.totalWeight).then((response) => {
    res.status(200).send(response);
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to get shipping prices");
  });

});
app.post("/cart/checkout/emt", async (req, res) => {
  const clientEmt = {
    account: {
      id: req.session.user._id,
      name: {
        givenName: req.session.user.name.givenName,
        middleName: req.session.user.name.middleName,
        familyName: req.session.user.name.familyName
      },
      username: req.session.user.username,
      cell: req.session.user.phones
    },
    shippingAddress: {
      name: req.body.familyName + req.body.givenName,
      street: req.body.street,
      city: req.body.city,
      province: req.body.province,
      country: req.body.country,
      postal: req.body.postal
    },
    billingAddress: {
      name: req.body.familyNameBill + req.body.givenNameBill,
      street: req.body.streetBill,
      city: req.body.cityBill,
      province: req.body.provinceBill,
      country: req.body.countryBill,
      postal: req.body.postalBill
    }
  };
  const orderEmt = {
    items: req.session.cart.items,
    totalQty: req.session.cart.totalQty,
    subtotal: req.body.subtotal
  };
  const shippingEmt = {
    carrier: req.body.service,
    weight: req.session.cart.totalWeight,
    total: req.body.cost
  };
  const invoiceEmt = await Store.orders.create(new Date(), clientEmt, orderEmt, shippingEmt, req.body.total, "new").then((invoice) => {
    return invoice;
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to place your order");
  });
  for (var i = 0; i < req.session.cart.items.length; i++) {
    const stock = Store.stock.sell(req.session.cart.items[i].color, req.session.cart.items[i].size, req.session.cart.items[i].name, req.session.cart.items[i].qty)
      .then((stock) => {
        return stock;
      }).catch((error) => {
        console.log(error);
      });
  }
  req.session.cart = null
  req.session.save();
  res.status(200).send(invoiceEmt._id);
});
app.post("/cart/checkout/paypal", async (req, res) => {
  const clientPayPal = {
    account: {
      id: req.session.user._id,
      name: {
        givenName: req.session.user.name.givenName,
        middleName: req.session.user.name.middleName,
        familyName: req.session.user.name.familyName
      },
      username: req.session.user.username,
      cell: req.session.user.phones
    },
    shippingAddress: {
      name: req.body.familyName + req.body.givenName,
      street: req.body.street,
      city: req.body.city,
      province: req.body.province,
      country: req.body.country,
      postal: req.body.postal
    },
    billingAddress: {
      name: req.body.familyNameBill + req.body.givenNameBill,
      street: req.body.streetBill,
      city: req.body.cityBill,
      province: req.body.provinceBill,
      country: req.body.countryBill,
      postal: req.body.postalBill
    }
  };
  const orderPayPal = {
    items: req.session.cart.items,
    totalQty: req.session.cart.totalQty,
    subtotal: req.body.subtotal
  };
  const shippingPayPal = {
    carrier: req.body.service,
    weight: req.session.cart.totalWeight,
    total: req.body.cost
  };
  const invoicePaypal = await Store.orders.create(new Date(), clientPayPal, orderPayPal, shippingPayPal, req.body.total, "new").then((invoice) => {
    return invoice;
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to place your order");
  });
  const payment = await Payment.add(invoicePaypal._id, req.body.payment.id, req.body.payment.status, req.body.payment.purchase_units[0].amount.value, req.body.payment.purchase_units[0].amount.currency_code, req.body.payment.create_time, "paypal").then((payment) => {
    return payment;
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to log this payment. The payment was processed. Please contact us as soon as possible to update our files");
  });
  for (var i = 0; i < req.session.cart.items.length; i++) {
    const stock = Store.stock.sell(req.session.cart.items[i].color, req.session.cart.items[i].size, req.session.cart.items[i].name, req.session.cart.items[i].qty)
      .then((stock) => {
        return stock;
      }).catch((error) => {
        console.log(error);
      });
  }
  req.session.cart = null
  req.session.save();
  res.status(200).send(invoicePaypal._id);
});
app.post("/staff/get", (req, res) => {
  Staff.getAll().then((staff) => {
    res.status(200).send(staff);
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to get teams");
  })
})
app.post("/faq/get", (req, res) => {
  Faq.getAll().then((faq) => {
    res.status(200).send(faq);
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to get FAQs")
  })
});
app.post("/documents/get", (req, res) => {
  Documents.getAll().then((docs) => {
    res.status(200).send(docs);
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to get documents");
  })
});
app.post("/payments/get", (req, res) => {
  Payment.getPaymentTotalByOrder(req.body.id).then((payments) => {
    res.status(200).send(payments);
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to get payments for this order");
  });
});
app.post("/payments/get/order", (req, res) => {
  Payment.getByOrder(req.body.id).then((payments) => {
    res.status(200).send(payments);
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to get payments for this order");
  });
});
app.post("/update/donations", (req, res) => {
  try {
    process.env.DONATION = req.body.total;
    res.status(200).send("Donations updated");
  } catch (error) {
    console.log(error);
    res.status(400).send("There was an error while trying to update donation total");
  }
})
app.post("/get/authentication", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).send("yes");
  } else {
    res.status(200).send("no");
  }
})
app.post("/dashboard/tournaments/date/get/:id", (req, res) => {
  Tournament.tournaments.getById(req.params.id).then((tournament) => {
    res.status(200).send(tournament.dateTime.start.date);
  }).catch((error) => {
    res.status(200).send("N/A");
  })
})
app.route("/dashboard/tournaments/contacts/:id/report").get((req, res) => {
  res.render("adminPages/reports/contacts/tournament-contact");
}).post((req, res) => {
  Tournament.registrations.getByTournament(req.params.id).then((regs) => {
    res.status(200).send(regs);
  }).catch((error) => {
    console.log(error);
    res.status(400).send("There was an error while trying to get teams for this report");
  })
});

// user account routes ******************************************
app.route("/user/account/:id").get((req, res) => {
  // render account page
  res.render("memberPages/account/main");
}).post((req, res) => {
  const user = req.session.user;
  // get all relavent user information
  switch (req.body.type) {
    case "details":
      User.getById(req.params.id).then((user) => {
        res.status(200).send(user);
      }).catch((error) => {
        console.log(error);
        res.status(400).send("There was an error while trying to get yuor account details");
      })
      break;
    case "orders":
      Store.orders.getByClientsUsername(user.username).then((orders) => {
        res.status(200).send(orders);
      }).catch((error) => {
        console.log(error);
        res.status(400).send("There was an error while trying to get your orders. Please try again later");
      })
      break;
    case "registrations":
      Tournament.registrations.getByTeam(user.name.givenName + " " + user.name.familyName, user.phone || user.phones).then((regs) => {
        res.status(200).send(regs);
      }).catch((error) => {
        console.log(error);
        res.status(400).send("There was an error while tring to get your registrations. Please try again later");
      })
      break;
  }
}).put((req, res) => {
  // update user information
  Upload.image(req, res, req.params.id).then((path) => {
    User.updateProfilePicture(req.params.id, path).then(() => {
      res.status(200).send("Profile Image was updated successfully!");
    })
  }).catch((error) => {
    console.log(error);
    res.status(400).send("Couldn't upload your file");
  });
})

app.get("/privacy-policies", function(req, res) {
  res.render("policies/privacy-Policies");
});
app.get("/terms-conditions", function(req, res) {
  res.render("policies/terms-conditions");
});
app.get("/refunds-returns", function(req, res) {
  res.render("policies/return-refund");
});
app.get("/cookies", function(req, res) {
  res.render("policies/cookies");
});

// upload function
const uploadFile = (location, file, size) => {
  return new Promise((resolve, reject) => {
    fs.access("assets/" + location, (error) => {
      if(error) {
        fs.mkdirSync("assets/" + location);
      }
    });
    const buffer = file.buffer;
    const path = "/" + location + "/" + size + "-" + file.originalname;
    const timestamp = new Date().toISOString();
    sharp(buffer)
      .resize(size)
      .toFile("assets" + path, (err, info) => {
        if(err) {
          reject(err);
        }
        resolve(path);
      });
  });
}

// listener ******************************************************
if(cluster.isMaster) {
  for(var i = 0; i < NumCpu; i++){
    cluster.fork();
  }
  cluster.on("exit", (worker, code, singal) => {
    // console.log("worker " + worker.process.pid + " died");
    cluster.fork();
  })
} else {
  if (process.env.NODE_ENV === "development") {
    app.listen(3003, function(err) {
      if (err) {
        console.log(err);
        return;
      }
      console.log("Started PID: " + process.pid + " @ localhost:3003");
    });
  } else {
    app.listen(function(err) {
      if (err) {
        console.log(err);
      }
    });
  }
}
