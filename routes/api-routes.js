// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
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
			password: req.body.password
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
				id: req.user.id
			});
		}
	});

	app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });
	// Create route to attend a new party ; PUT request
	app.put("/api/attend/:id"), function (req, res) {
		db.User.update({
			where : {
				id: req.params.id
			}
		})
	};

	// Create a new party
	app.post("/api/newparty", function (req, res) {
		console.log(req.body);
		db.Party.create({
			title: req.body.title,
			theme: req.body.theme,
			date: req.body.date,
			time: req.body.time,
			location: req.body.location
		})
			.then(function(){
				res.redirect(307, "/api/dashboard")
			})
			.catch(function(err){
				res.status(401).json(err);
			})
	});

	// Create find parties route
	app.get("/api/findparties"), function (req, res) {
		db.Party.findAll({}).then(function(dbParty){
			res.json(dbParty)
		})
	};
};


  // Route for logging user out
//   app.get("/logout", function(req, res) {
//     req.logout();
//     res.redirect("/");
//   });
