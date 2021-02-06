// Requiring path to so we can use relative routes to our HTML files
// var path = require("path");

// // Requiring our custom middleware for checking if a user is logged in
// var isAuthenticated = require("../config/middleware/isAuthenticated");

// module.exports = function(app) {

//   app.get("/", function(req, res) {
//     // If the user already has an account send them to the dashboard page
//     if (req.user) {
//       res.redirect("/dashboard");
//     }
//     res.sendFile(path.join(__dirname, "../public/.html")); //****Add route once created */
//   });

//   app.get("/login", function(req, res) {
//     // If the user already has an account send them to the members page
//     if (req.user) {
//       res.redirect("/members");
//     }
//     res.sendFile(path.join(__dirname, "../public/login.html")); //****Add route once created */
//   });

//   // Here we've add our isAuthenticated middleware to this route.
//   // If a user who is not logged in tries to access this route they will be redirected to the signup page
//   app.get("/dashboard", isAuthenticated, function(req, res) {
//     res.sendFile(path.join(__dirname, "../public/members.html")); //***Edit route once created */
//   });

// };


// Bbbbbbbbbbbbbbbbbbbb
// bbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
module.exports = function (app, path) {
  // html routes to individual pages
  app.get("/main", (req, res) => {
    res.sendFile("/htmls/authed.html", { root: path.join(__dirname, "../public") })
  })
  app.get("/myevents", (req, res) => {
    res.sendFile("/htmls/myevents.html", { root: path.join(__dirname, "../public") })
  })
  app.get("/attending", (req, res) => {
    res.sendFile("/htmls/attending.html", { root: path.join(__dirname, "../public") })
  })
  app.get("/create", (req, res) => {
    res.sendFile("/htmls/create.html", { root: path.join(__dirname, "../public") })
  })
  app.get("/profile", (req, res) => {
    res.sendFile("/htmls/profile.html", { root: path.join(__dirname, "../public") })
  })
  app.get("/login", (req, res) => {
    res.sendFile("htmls/login.html", { root: path.join(__dirname, "../public") })
  })
  // send default page to all routes that are undefined
  app.get("*", (req, res) => {
    res.sendFile("/htmls/index.html", { root: path.join(__dirname, "../public") })
  })
}
