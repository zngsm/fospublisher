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

function returnEachFollow(a, b) {
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

function EachFollow(a, b) {
  let each = [];
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
      if (a[i].id == b[j].id) {
        each.push(a[i].id);
      }
    }
  }
  return each;
}

function checkEachFollow(a, b, c) {
  let each = [];
  let goToNext = false;
  for (let i = 0; i < a.length; i++) {
    if (a[i].id == c) {
      goToNext = true;
      break;
    }
  }
  if (!goToNext) {
    return false;
  }
  for (let i = 0; i < b.length; i++) {
    if (b[i].id == c) {
      return true;
    }
  }
  return false;
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
  let eachFollowers = returnEachFollow(followingList, followerList);
  let eachFollowInfo = [eachFollowers.length];
  let contextArray = [];
  let contextIdx = 0;
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
    if (contextIdx < 4) {
      contextArray.push(context);
      contextIdx++;
    } else if (contextIdx == 4) {
      contextArray.push(context);
      eachFollowInfo.push(contextArray);
      contextArray = [];
      contextIdx = 0;
    }
  }
  if (contextArray) {
    eachFollowInfo.push(contextArray);
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
  console.log("팔로워", followerList);
  followingList.forEach(async (following) => {
    console.log(following);
    let followingInfo = {};
    followingInfo["id"] = following.id;
    followingInfo["nickname"] = following.nickname;
    followingInfo["birthday"] = following.birthday;
    followingInfo["introduce"] = following.introduce;
    followingInfo["img"] = following.img;
    followingInfo["time"] = following.Follow.createdAt;
    if (each.includes(following.id)) {
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
  // console.log("팔로워", followerList);
  followerList.forEach(async (follower) => {
    // console.log(follower);
    let followerInfo = {};
    followerInfo["id"] = follower.id;
    followerInfo["nickname"] = follower.nickname;
    followerInfo["birthday"] = follower.birthday;
    followerInfo["introduce"] = follower.introduce;
    followerInfo["img"] = follower.img;
    followerInfo["time"] = follower.Follow.createdAt;
    if (each.includes(follower.id)) {
      followerInfo["each"] = true;
    } else {
      followerInfo["each"] = false;
    }
    context.push(followerInfo);
  });
  res.send(context);
};

exports.get_follow_book = async (req, res) => {
  let requesterId = res.locals.userId;
  let followingId = req.params.id;
  let requester = await models.Users.findOne({
    where: { id: requesterId },
    include: [
      { model: models.Users, as: "Followings" },
      { model: models.Users, as: "Followers" },
    ],
  });
  let followingList = requester.Followings;
  let followerList = requester.Followers;
  if (!checkEachFollow(followingList, followerList, followingId)) {
    return res.status(403).send({ error: "맞팔로우된 유저가 아닙니다." });
  }
  let book = null;
  const context = {};
  await models.BookPasts.findOne({
    where: { UserId: followingId },
  }).then((result) => {
    context["cover"] = result["dataValues"];
    delete context["cover"]["createdAt"];
    delete context["cover"]["updatedAt"];
    delete context["cover"]["UserId"];
    book = result;
  });
  await models.ChapterPasts.findAll({
    where: { BookPastId: book.id, check: true, share: true },
    order: [["year"], ["order"]],
  }).then((result) => {
    const content = [];
    const list = {};
    let pageStart = 0;
    result.forEach((chapter) => {
      let chap = chapter["dataValues"];
      delete chap["updatedAt"];
      delete chap["BookPastId"];
      content.push(chap);
      const year = chapter["dataValues"]["year"];
      let listChap = {};
      listChap["title"] = chapter["dataValues"]["title"];
      listChap["id"] = chapter["dataValues"]["id"];
      listChap["pageStart"] = pageStart;
      if (year in list === false) {
        list[year] = [];
      }
      list[year].push(listChap);
      pageStart += chapter["dataValues"]["page"];
    });
    context["content"] = content;
    context["list"] = list;
    res.send(context);
  });
};
