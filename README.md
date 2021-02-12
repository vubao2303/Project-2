# Party-X

Project description here
* Full stack application deployed to Heroku
* Team build requiring constant communication
* Git tracked project in rapid development process

<img width="1249" alt="project2 - mainpage" src="https://user-images.githubusercontent.com/52800632/107716276-ded6c780-6c85-11eb-9446-1a56a2f0e975.png">

Demo Video:
![templateengine](https://user-images.githubusercontent.com/52800632/107716420-3a08ba00-6c86-11eb-8f3c-83bfae0e94f4.gif)



## Table of Contents 

| |||
|:-:|:-:|:-:|
|[Project Introduction](#party-x) | [Table of Contents](#table-of-contents)| [Development Highlights](development-highlights)
|[Heroku](#heroku-deployed) | [Description of Page Building](#Description-of-Page-Building)| [Authors](#authors) 
| [Technologies Used](#Technologies-Used) | [LinkedIn](#LinkedIn) | [License](#License)

---

## Development Highlights

* Project learning goals
* Development process (user stories -> githib cards -> git branches -> commits)
* MVC architecture

## Heroku-Deployed

[Deployed Link](https://party-x.herokuapp.com/)

## Description of Page Building 
* In config file
   <ul> 
  <li> A middleware file that contains authenticated file
  <li> Config.json file
  <li> passport.js file to authenticate using local strategy 
  </li>
  </ul>

* In another 
  <ul> 
  <li> 
  <li> 
  <li> 
  </li>
  </ul>


* In another file 
  <ul> 
  <li> 
  <li> 
  <li> 
  </li>
   </ul>



## Code Snippet

Snippet of the use of sequelize operators. [Op.not] was used to set a condition that finds all Parties where the hostId is not equivalent to the userId in order to prevent duplicate events being created.
```javascript


  app.get("/api/availableparty", (req, res) => {
    db.Party.findAll({
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
```
Sets up the Express app to handle data parsing
``` Javascript

```

Set routes to handle when user "visit" the page 
``` Javascript

```

Use Passport to authenticate file. If there's no user with the given email or passwords, an error message will show. 
``` Javascript 
passport.use(new LocalStrategy(
  {usernameField: "email"},
  function(email, password, done) {db.User.findOne({
      where: {email: email}
    }).then(function(dbUser) {
      if (!dbUser) {
        return done(null, false, {
          message: "Incorrect email."
        });
      }
      else if (!dbUser.validPassword(password)) {
        return done(null, false, {
          message: "Incorrect password."
        });
      }
      return done(null, dbUser);
    });
  }
));
```

In order to help keep authentication state across HTTP requests, Sequelize needs to serialize and deserialize the user
``` Javascript 
passport.serializeUser(function(user, cb) {
  cb(null, user);});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);});
```

## Technologies Used

||||||
|:-:|:-:|:-:|:-:|:-:|
|[HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) | [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) | [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) |[Node.js](https://nodejs.org/en/) |[MySQL Database](https://www.mysql.com/)
|[Express](https://expressjs.com/) | [Express-Session](https://www.npmjs.com/package/express-session) |[Sequelize](https://sequelize.org/) |[bcrypt](https://www.npmjs.com/package/bcrypt) |[Passport](http://www.passportjs.org/)
| [MySQL](https://www.mysql.com/) | [MySQL2](https://github.com/sidorares/node-mysql2#readme) | [Heroku](https://heroku.com/) | [GitHub](https://github.com/)

<br>

## Authors

| | |
| --- | --- |
|**B Tram Vu**|[![Linkedin](https://i.stack.imgur.com/gVE0j.png) LinkedIn](https://www.linkedin.com/in/b-tram-vu-866250121/)  [![GitHub](https://i.stack.imgur.com/tskMh.png) GitHub](https://github.com/vubao2303)
|**Jaja Brown**|[![Linkedin](https://i.stack.imgur.com/gVE0j.png) LinkedIn](https://www.linkedin.com/in/jaja-brown-a42261201/) [![GitHub](https://i.stack.imgur.com/tskMh.png) GitHub](https://github.com/jbrown827)
|**Ron-Arjay Caluag**|[![Linkedin](https://i.stack.imgur.com/gVE0j.png) LinkedIn](https://www.linkedin.com/in/ron-arjay-caluag-00b29b182/) [![GitHub](https://i.stack.imgur.com/tskMh.png) GitHub](https://github.com/ArjayCaluag)
|**Coleman Buffa**|[![Linkedin](https://i.stack.imgur.com/gVE0j.png) [LinkedIn](hhttps://www.linkedin.com/in/coleman-buffa/) [![GitHub](https://i.stack.imgur.com/tskMh.png) GitHub](https://github.com/coleman-buffa)

---

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
