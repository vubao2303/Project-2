// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
var { Op } = require("sequelize");
// const { regexp } = require("sequelize/types/lib/operators");

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/signin", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/newuser", function (req, res) {
    db.User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
      .then(function () {
        res.redirect(307, "/api/signin");
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
        name: req.user.name,
      });
    }
  });

  app.get("/api/hostedparty", (req, res) => {
    db.Party.findAll({
      where: {
        hostId: req.user.id,
      },
    }).then((data) => {
      res.json(data);
    });
  });

  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });
  // Create route to attend a new party ; PUT request
  app.put("/api/attend/:id"),
    function (req, res) {
      db.User.update({
        where: {
          id: req.params.id,
        },
      });
    };

  // Create a new party
  app.post("/api/newparty", function (req, res) {
    console.log(req.body);
    db.Party.create({
      title: req.body.title,
      theme: req.body.theme,
      date: req.body.date,
      time: req.body.time,
      location: req.body.location,
      hostId: req.user.id,
    }).then(function () {
      res.send(200);
    });
    // .catch(function(err){
    // 	res.status(401).json(err);
    // })
  });

  // route used to get all events
  app.get("/api/event", (req, res) => {
    // search Event table for all events
    console.log("made it to events");
    db.Party.findAll({
      // join User since it contains the host's name
      where: {
        hostId: {
          [Op.not]: req.user.id,
        },
      },
      include: [
        {
          model: db.User,
          as: "host",
          attributes: ["name"],
        },
      ],
    })
      .then((events) => {
        res.json(events);
      })
      .catch((err) => {
        console.log(err);
        res.send(false);
      });
  });

  // // Create find parties route
  // app.get("/api/attendparty"),
  //   function (req, res) {
  //     console.log("Made it to attend party")
  //     db.UserParty.findAll({
  //       where: {
  //         UserId: req.user.id,
  //       },
  //       include: {
  //         model: db.Party,
  //         include: {
  //           model: db.User,
  //           as: "host",
  //           attributes: ["name"]
  //         }
  //       }
  //     }).then(function (dbUserParty) {
  //       res.json(dbUserParty);
  //     });
  //   };

  // Route to present parties on userdashboard
  app.get("/api/allparties"),
    function (req, res) {
      db.Party.findAll({});
    };
};

// Route for logging user out
//   app.get("/logout", function(req, res) {
//     req.logout();
//     res.redirect("/");
//   });

//
