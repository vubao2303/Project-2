// module.exports = function (sequelize, DataTypes) {
// 	let Party = sequelize.define("Party", {
// 		title: {
// 			type: DataTypes.STRING,
// 			allowNull: false
// 		},
// 		theme: {
// 			type: DataTypes.STRING,
// 			allowNull: false
// 		},
// 		date: {
// 			type: DataTypes.DATE,
// 			allowNull: false,
// 			validate: {
// 				isDate: true
// 			}
// 		},
// 		time: {
// 			type: DataTypes.TIME,
// 			allowNull: false,
// 			validate: {
// 				isTime: true
// 			}
// 		},
// 		location: {
// 			type: DataTypes.STRING,
// 			allowNull: false
// 		}

// 	});
// 	Party.associate = models => {
// 		//Each party belongs to a single User
// 		models.Party.belongsTo(models.User, { as: "host" })
// 		//Each Party can have many UserParties
// 		models.Event.hasMany(models.UserParties, {
// 			onDelete: "cascade"
// 		})
// 		}
// 	return Party;
// };


// BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
// BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
module.exports = function (sequelize, DataTypes) {
  var Event = sequelize.define("Event", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  // associating Events table to Users and UserEvents
  Event.associate = models => {
    // Each Event belongs to A User
    models.Event.belongsTo(models.User, { as: "host" })
    // Each Event can have many UserEvents
    models.Event.hasMany(models.UserEvent, {
      // this deletes all associated UserEvents when an Event is deleted
      onDelete: "cascade"
    })
  }
  return Event;
}