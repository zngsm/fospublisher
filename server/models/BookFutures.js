module.exports = (sequelize, DataTypes) => {
  const BookFutures = sequelize.define("BookFutures", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    page: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    size: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: false },
    skin: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: false },
    font: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: false },
    font_color: {
      type: DataTypes.STRING,
      defaultValue: "#000000",
      allowNull: false,
    },
  });

  BookFutures.associate = (models) => {
    BookFutures.belongsTo(models.Users);
  };

  return BookFutures;
};
