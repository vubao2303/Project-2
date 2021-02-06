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
		Party.belongsTo(models.User, {
			foreignKey: {
				allowNull: false
			}
		});
	};
	return Party;
};
