const models = require("../../models");

exports.get_timelines_read = async (req, res) => {
  let context = {};
  const book = await models.BookPasts.findOne({
    where: { UserId: res.locals.userId },
  });
  const UserInfo = await models.Users.findOne({
    where: { id: res.locals.userId },
  });
  models.ChapterPasts.findAll({
    where: { BookPastId: book.id },
    order: [["year"], ["order"]],
  }).then((result) => {
    let each5Chapter = [];
    let count = 0;
    let lastIdx = 0;
    result.forEach((chapter) => {
      let idxCnt = count % 5;
      let idxOrder = parseInt(count / 5);
      let node = chapter["dataValues"];
      delete node["createdAt"];
      delete node["updatedAt"];
      delete node["BookPastId"];
      delete node["page"];
      each5Chapter.push(node);
      if (each5Chapter.length == 5) {
        context[idxOrder] = each5Chapter.slice();
        each5Chapter = [];
      }
      count += 1;
      lastIdx = idxOrder;
    });
    if (each5Chapter.length > 0) {
      context[lastIdx] = each5Chapter;
    }
    let contexts = {};
    contexts["data"] = context;
    contexts["birth"] = UserInfo.birthday;
    contexts["name"] = UserInfo.nickname;
    res.send(contexts);
  });
};

exports.get_timelines_edit_mode = async (req, res) => {
  let context = {};
  const book = await models.BookPasts.findOne({
    where: { UserId: res.locals.userId },
  });
  models.ChapterPasts.findAll({
    where: { BookPastId: book.id },
    order: [["year"], ["order"]],
  }).then((result) => {
    result.forEach((chapter) => {
      let year = chapter.year;
      let node = {};
      node["title"] = chapter["dataValues"]["title"];
      node["id"] = chapter["dataValues"]["id"];
      if (!context[year]) {
        context[year] = [];
      }
      context[year].push(node);
    });
    res.send(context);
  });
};

exports.put_timelines_edit = async (req, res) => {
  let body = req.body;
  const book = await models.BookPasts.findOne({
    where: { UserId: res.locals.userId },
  });
  for (const key in body) {
    body[key].forEach((chapter) => {
      let order = {
        order: chapter.order,
      };
      models.ChapterPasts.update(order, {
        where: { id: chapter.id, BookPastId: book.id },
      });
    });
  }
  res.status(201).send({ success: "수정되었습니다." });
};
