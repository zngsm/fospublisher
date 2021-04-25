const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      username: { type: DataTypes.STRING },
      password: { type: DataTypes.STRING },
      salt: { type: DataTypes.STRING },
      birthday: { type: DataTypes.DATE },
      nickname: { type: DataTypes.STRING },
      introduce: { type: DataTypes.TEXT },
      img: { type: DataTypes.STRING },
      question: { type: DataTypes.INTEGER },
      answer: { type: DataTypes.STRING }
    }
  );

  Users.prototype.dateFormat = (date) => (
    moment(date).format('YYYY-MM-DD')
  );
  
  Users.associate = (models) => {
    Users.hasMany(models.BookPasts);
  };

  Users.associate = (models) => {
    Users.hasMany(models.BookFutures);
  };

  return Users;
}