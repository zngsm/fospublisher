module.exports = (sequelize, DataTypes) => {
  const ChapterPasts = sequelize.define("ChapterPasts", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: true },
    content: { type: DataTypes.TEXT, allowNull: true },
    year: { type: DataTypes.INTEGER, allowNull: false },
    order: { type: DataTypes.INTEGER, allowNull: false },
    question: { type: DataTypes.INTEGER, allowNull: false },
    page: { type: DataTypes.INTEGER, allowNull: false },
    check: { type: DataTypes.BOOLEAN, allowNull: false },
    share: { type: DataTypes.BOOLEAN, allowNull: false },
  });

  ChapterPasts.associate = (models) => {
    ChapterPasts.belongsTo(models.BookPasts);
  };

  return ChapterPasts;
};
