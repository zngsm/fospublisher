const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const Users = sequelize.define('Users',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      email: { type: DataTypes.STRING },
      password: { type: DataTypes.STRING },
      birthday: { type: DataTypes.DATE },
      auth: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      name: { type: DataTypes.STRING },
      introduce: { type: DataTypes.TEXT },
      img: { type: DataTypes.STRING }
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