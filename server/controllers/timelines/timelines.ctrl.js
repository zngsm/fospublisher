const models = require("../../models");

exports.get_timelines_read = async (req, res) => {
  let context = {};
  const book = await models.BookPasts.findOne({
    where: { UserId: res.locals.userId },
  });
  models.ChapterPasts.findAll({
    where: { BookPastId: book.id },
    order: [["year"], ["order"]],
  }).then((result) => {
    result.forEach((chapter) => {
      const year = chapter["dataValues"]["year"];
      let node = mkChapterObj(chapter);
      if (year in context === false) {
        context[year] = [];
      }
      context[year].push(node);
    });
    res.send(context);
  });
};

const mkChapterObj = (chapter) => {
  let node = {};
  node["title"] = chapter["dataValues"]["title"];
  node["id"] = chapter["dataValues"]["id"];
  node["order"] = chapter["dataValues"]["order"];
  node["check"] = chapter["dataValues"]["check"];
  return node;
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
