module.exports = (sequelize, DataTypes) => {
  const BookPasts = sequelize.define("BookPasts", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    page: { type: DataTypes.INTEGER },
    title: { type: DataTypes.STRING },
    size: { type: DataTypes.INTEGER },
    skin: { type: DataTypes.INTEGER },
    font: { type: DataTypes.INTEGER },
    skin_color: { type: DataTypes.STRING },
    font_color: { type: DataTypes.STRING },
  });

  BookPasts.associate = (models) => {
    BookPasts.belongsTo(models.Users);
  };

  return BookPasts;
};
