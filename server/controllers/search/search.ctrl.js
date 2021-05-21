const { Sequelize } = require("sequelize");
const models = require("../../models");

exports.search_username = async (req, res) => {
  const user = req.params.user;
  let requesterId = res.locals.userId;
  let context = [];
  let requester = await models.Users.findOne({
    where: { id: requesterId },
    include: [
      { model: models.Users, as: "Followings" },
      { model: models.Users, as: "Followers" },
    ],
  });
  let followingList = requester.Followings.map((f) => {
    return f.username;
  });
  let followerList = requester.Followers.map((f) => {
    return f.username;
  });
  if (requester.username != user) {
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
          following: false,
          follower: false,
        };
        if (followingList.includes(user)) {
          userInfo["following"] = true;
        }
        if (followerList.includes(user)) {
          userInfo["follower"] = true;
        }
        context.push(userInfo);
      }
    });
  }

  await models.Users.findAll({
    where: {
      [Sequelize.Op.and]: [
        { username: { [Sequelize.Op.like]: `%${user}%` } },
        { username: { [Sequelize.Op.notLike]: `${user}` } },
      ],
    },
  }).then((results) => {
    for (let result of results) {
      if (result.username != requester.username) {
        let userInfo = {
          id: result.id,
          username: result.username,
          nickname: result.nickname,
          img: result.img,
          birthday: result.birthday,
          introduce: result.introduce,
          following: false,
          follower: false,
        };
        if (followingList.includes(result.username)) {
          userInfo["following"] = true;
        }
        if (followerList.includes(result.username)) {
          userInfo["follower"] = true;
        }
        context.push(userInfo);
      }
    }
  });
  res.send(context);
};

exports.search_userinfo = async (req, res) => {
  const user = req.params.userId;
  await models.Users.findOne({
    where: {
      id: user,
    },
  })
    .then((result) => {
      res.status(200).json({ user: result });
    })
    .catch(() => {
      res.status(404).send({ error: "존재하지 않는 유저입니다" });
    });
};
