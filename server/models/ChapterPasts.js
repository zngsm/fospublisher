module.exports = (sequelize, DataTypes) => {
  const ChapterPasts = sequelize.define("ChapterPasts", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    content: { type: DataTypes.TEXT },
    year: { type: DataTypes.INTEGER },
    order: { type: DataTypes.INTEGER },
    page: { type: DataTypes.INTEGER },
    save: { type: DataTypes.BOOLEAN },
  });

  ChapterPasts.associate = (models) => {
    ChapterPasts.belongsTo(models.BookPasts);
  };

  return ChapterPasts;
};
