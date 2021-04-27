module.exports = (sequelize, DataTypes) => {
  const ChapterFutures = sequelize.define("ChapterFutures", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: true },
    content: { type: DataTypes.TEXT, allowNull: true },
    year: { type: DataTypes.INTEGER, allowNull: false },
    month: { type: DataTypes.INTEGER, allowNull: false },
    day: { type: DataTypes.INTEGER, allowNull: false },
    page: { type: DataTypes.INTEGER, allowNull: false },
    check: { type: DataTypes.BOOLEAN, allowNull: false },
  });

  ChapterFutures.associate = (models) => {
    ChapterFutures.belongsTo(models.BookFutures);
  };

  return ChapterFutures;
};
