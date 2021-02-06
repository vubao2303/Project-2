module.exports = function (sequelize, DataTypes) {
	let Party = sequelize.define("Party", {
		title: {
			type: DataTypes.STRING,
			allowNull: false
		},
		theme: {
			type: DataTypes.STRING,
			allowNull: false
		},
		date: {
			type: DataTypes.DATE,
			allowNull: false,
			validate: {
				isDate: true
			}
		},
		time: {
			type: DataTypes.TIME,
			allowNull: false,
			validate: {
				isTime: true
			}
		},
		location: {
			type: DataTypes.STRING,
			allowNull: false
		}

	});
	Party.associate = models => {
		//Each party belongs to a single User
		models.Party.belongsTo(models.User, { as: "host" })
		//Each Party can have many UserParties
		models.Event.hasMany(models.UserParties, {
			onDelete: "cascade"
		})
		}
	return Party;
};
