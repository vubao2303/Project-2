module.exports = function (sequelize, DataTypes) {
    var UserParty = sequelize.define("UserParty", {
    });
  
    // associate UserEvents with Users and Events
    UserParty.associate = models => {
      // Each UserEvent belongs to one User
      models.UserParty.belongsTo(models.User, { onDelete: "cascade" });
      // and One Event
      models.UserParty.belongsTo(models.Party, { onDelete: "cascade" });
    }
  
    return UserParty;
  }