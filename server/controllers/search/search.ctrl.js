const { Sequelize } = require("sequelize");
const models = require("../../models");

exports.search_username = async (req, res) => {
  const user = req.params.user;
  let context = [];

  await models.Users.findOne({
    where: {
      [Sequelize.Op.or]: [{ username: { [Sequelize.Op.like]: user } }],
    },
  }).then((result) => {
    if (result) {
      let userInfo = {
        id: result.id,
        username: result.username,
        nickname: result.nickname,
        img: result.img,
        birthday: result.birthday,
        introduce: result.introduce,
      };
      context.push(userInfo);
    }
  });

  await models.Users.findAll({
    where: {
      [Sequelize.Op.and]: [
        { username: { [Sequelize.Op.like]: `%${user}%` } },
        { username: { [Sequelize.Op.notLike]: `${user}` } },
      ],
    },
  }).then((results) => {
    for (let result of results) {
      let userInfo = {
        id: result.id,
        username: result.username,
        nickname: result.nickname,
        img: result.img,
        birthday: result.birthday,
        introduce: result.introduce,
      };
      context.push(userInfo);
    }
  });
  res.send(context);
};
