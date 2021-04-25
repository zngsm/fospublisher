module.exports = (sequelize, DataTypes) => {
  const ChapterFutures = sequelize.define("ChapterFutures", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    content: { type: DataTypes.TEXT },
    year: { type: DataTypes.INTEGER },
    month: { type: DataTypes.INTEGER },
    day: { type: DataTypes.INTEGER },
    page: { type: DataTypes.INTEGER },
    check: { type: DataTypes.BOOLEAN },
  });

  ChapterFutures.associate = (models) => {
    ChapterFutures.belongsTo(models.BookFutures);
  };

  return ChapterFutures;
};
