module.exports = function(sequelize, DataTypes) {
  const BookFutures = sequelize.define('BookFutures',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      page: { type: DataTypes.INTEGER },
      title: { type: DataTypes.STRING }
    }
  );
  
  BookFutures.associate = (models) => {
    BookFutures.belongsTo(models.Users);
  };

  return BookFutures;
}