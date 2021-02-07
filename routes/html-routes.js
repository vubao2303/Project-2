//  Requiring path to so we can use relative routes to our HTML files
var path = require("path");
var exphbs = require("express-handlebars");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {


  app.get("/", function (req, res) {
    // If the user already has an account send them to the dashboard page
    if (req.user) {
      res.redirect("/index");
    }
    res.sendFile(path.join(__dirname, "../public/htmls/signup.html"));
  });

  app.get("/login", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/index");
    }
    res.sendFile(path.join(__dirname, "../public/htmls/login.html"));
  });
  // B CHANGE LINE 27 from /dashboard to /index
  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/index", isAuthenticated, function (req, res) {
    // $.get("/userdashboard").then(function(data, err){
    //   // construct hbsObject 
      
    // })

    res.render("index");
  });
};


//Three pages
//Login (static HTML)
//Signup (static HTML)
//Dashboard (handlebars template engine)
