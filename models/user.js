// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
var bcrypt = require("bcryptjs");
// Creating our User model
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // The email cannot be null, and must be a proper email before creation
    name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		party: {
			type: DataTypes.STRING,
			allowNull: true
		},
		//Email is a required field and will be validated as an email
		//it must also be unique in the database as it will be used to
		//identify users
		email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

	//Associating Users table to Parties
	User.associate = models => {
		model.User.hasMany(models.Party, {onDelete: "cascade"});
		models.User.hasMany(models.UserParties, {onDelete: "cascade"});
	}

  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.addHook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  return User;
};

// B TRYING 
// 
// 
// 
// 
// B TRYING 
const user = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = {
  findOne: async function (req, res) {
    try {
      var check = await user.findOne({ username: req.body.username }).exec();
      if (bcrypt.compareSync(req.body.password, check.password)) {
        res.send(check)
      } else {
        return res.status(422).send("bad password")
      }
    } catch (error) {
      res.status(500).send(error);
    }
  },
  create: function (req, res) {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(req.body.password, salt);
    user
      .create({ username: req.body.username, password: hash })
      .then((user) => res.json(user))
      .catch((err) => res.status(422).json(err));
  },
  update: function (req, res) {
    user.findByIdAndUpdate(
      req.body._id
      ,
      {
        level: req.body.level,
        lives: req.body.lives
      })
      .then((user) => res.json(user))
      .catch((err) => {
        // console.log("error: ", err);
        return res.status(422).json(err)
      });
  },
  findAll: function (req, res) {
    user.find({})
      .then((user) => res.json(user))
      .catch((err) => res.status(422).json(err));
  },
};

// BTRYING AGAIAN AND AGAIN! 