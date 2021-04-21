module.exports = function(sequelize, DataTypes) {
  const BookPasts = sequelize.define('BookPasts',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      page: { type: DataTypes.INTEGER },
      title: { type: DataTypes.STRING }
    }
  );
  
  BookPasts.associate = (models) => {
    BookPasts.belongsTo(models.Users);
  };

  return BookPasts;
}