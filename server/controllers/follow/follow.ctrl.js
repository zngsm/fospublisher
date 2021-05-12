const models = require("../../models");

exports.add_follow = async (req, res) => {
  let body = await req.body;
  let followingId = body.followingId;
  let followerId = res.locals.userId;
  if (followingId == followerId) {
    return res.status(400).send({ error: "본인은 팔로우할 수 없습니다." });
  }
  let person = await models.Users.findOne({
    where: { id: followingId },
    include: [{ model: models.Users, as: "Followers" }],
  });
  if (!person) {
    return res.status(404).send({ error: "존재하지 않는 유저입니다." });
  }
  if (person.Followers) {
    person.Followers.forEach((follower) => {
      let otherFollowerId = follower.id;
      if (followerId == otherFollowerId) {
        return res
          .status(400)
          .send({ error: "이미 팔로우 신청한 유저입니다." });
      }
    });
  }
  await person.addFollower(followerId);
  res.json({ success: `${person.nickname} 에게 팔로우신청을 보냈습니다` });
};

exports.remove_follow = async (req, res) => {
  let followingId = req.params.id;
  let followerId = res.locals.userId;
  if (followingId == followerId) {
    return res.status(400).send({ error: "본인을 팔로우 취소할 수 없습니다." });
  }
  let following = await models.Users.findOne({
    where: { id: followingId },
  });
  let follower = await models.Users.findOne({
    where: { id: followerId },
    include: [{ model: models.Users, as: "Followings" }],
  });
  let isInclude = false;
  if (follower.Followings) {
    for (let following of follower.Followings) {
      if (following.id == followingId) {
        isInclude = true;
        break;
      }
    }
  } else {
    return res.status(404).send({ error: "팔로우한 유저가 없습니다." });
  }
  if (!isInclude) {
    return res.status(404).send({ error: "팔로우하지 않은 유저입니다." });
  }
  await follower.removeFollowing(followingId);
  res.json({ success: `${following.nickname} 의 팔로우를 취소했습니다.` });
};

function EachFollow(a, b) {
  let each = [];
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
      if (a[i].id == b[j].id) {
        each.push(a[i]);
      }
    }
  }
  return each;
}

exports.get_follow_list = async (req, res) => {
  let requestId = res.locals.userId;
  let requester = await models.Users.findOne({
    where: { id: requestId },
    include: [
      { model: models.Users, as: "Followings" },
      { model: models.Users, as: "Followers" },
    ],
  });
  let followingList = requester.Followings;
  let followerList = requester.Followers;
  let eachFollowers = EachFollow(followingList, followerList);
  let eachFollowInfo = [];
  for (let follower of eachFollowers) {
    let context = {};
    let followerId = follower.id;
    context["id"] = follower.id;
    context["nickname"] = follower.nickname;
    context["birthday"] = follower.birthday;
    context["introduce"] = follower.introduce;
    context["img"] = follower.img;
    let bookInfo = {};
    let book = await models.BookPasts.findOne({
      where: { UserId: followerId },
    });
    bookInfo = book["dataValues"];
    delete bookInfo["createdAt"];
    delete bookInfo["updatedAt"];
    delete bookInfo["UserId"];
    context["book"] = bookInfo;
    eachFollowInfo.push(context);
  }
  res.send(eachFollowInfo);
};

exports.get_following_list = async (req, res) => {
  let requesterId = res.locals.userId;
  let requester = await models.Users.findOne({
    where: { id: requesterId },
    include: [
      { model: models.Users, as: "Followings" },
      { model: models.Users, as: "Followers" },
    ],
  });
  let followingList = requester.Followings;
  let followerList = requester.Followers;
  let each = EachFollow(followingList, followerList);
  let context = [];
  followingList.forEach(async (following) => {
    let followingInfo = {};
    followingInfo["id"] = following.id;
    followingInfo["nickname"] = following.nickname;
    followingInfo["birthday"] = following.birthday;
    followingInfo["introduce"] = following.introduce;
    followingInfo["img"] = following.img;
    followingInfo["time"] = following.Follow.createdAt;
    if (each.includes(following)) {
      followingInfo["each"] = true;
    } else {
      followingInfo["each"] = false;
    }
    context.push(followingInfo);
  });
  res.send(context);
};
exports.get_follower_list = async (req, res) => {
  let requesterId = res.locals.userId;
  let requester = await models.Users.findOne({
    where: { id: requesterId },
    include: [
      { model: models.Users, as: "Followings" },
      { model: models.Users, as: "Followers" },
    ],
  });
  let followingList = requester.Followings;
  let followerList = requester.Followers;
  let each = EachFollow(followingList, followerList);
  let context = [];
  followerList.forEach(async (follower) => {
    let followerInfo = {};
    followerInfo["id"] = follower.id;
    followerInfo["nickname"] = follower.nickname;
    followerInfo["birthday"] = follower.birthday;
    followerInfo["introduce"] = follower.introduce;
    followerInfo["img"] = follower.img;
    followerInfo["time"] = follower.Follow.createdAt;
    if (each.includes(follower)) {
      followerInfo["each"] = true;
    } else {
      followerInfo["each"] = false;
    }
    context.push(followerInfo);
  });
  res.send(context);
};
