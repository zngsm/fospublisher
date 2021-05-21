const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    salt: { type: DataTypes.STRING, allowNull: false },
    birthday: { type: DataTypes.DATE, allowNull: false },
    nickname: { type: DataTypes.STRING, allowNull: false },
    introduce: { type: DataTypes.TEXT, allowNull: true },
    img: { type: DataTypes.STRING, allowNull: true },
    question: { type: DataTypes.INTEGER, allowNull: false },
    answer: { type: DataTypes.STRING, allowNull: false },
  });

  Users.prototype.dateFormat = (date) => moment(date).format("YYYY-MM-DD");

  Users.associate = (models) => {
    Users.hasMany(models.BookPasts);
    Users.hasMany(models.BookFutures);
    Users.belongsToMany(models.Users, {
      through: "Follow",
      as: "Followers",
      foreignKey: "followingId",
    });
    Users.belongsToMany(models.Users, {
      through: "Follow",
      as: "Followings",
      foreignKey: "followerId",
    });
  };
  return Users;
};
