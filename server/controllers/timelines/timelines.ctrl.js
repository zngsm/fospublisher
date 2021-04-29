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
    let count = 0;
    result.forEach((chapter) => {
      const year = chapter["dataValues"]["year"];
      let idxCnt = count % 5;
      let idxOrder = parseInt(count / 5);
      if (idxOrder % 2) {
        idxCnt = 4 - idxCnt;
      }
      let node = mkChapterObj(chapter, idxCnt, idxOrder);
      if (year in context === false) {
        context[year] = [];
      }
      context[year].push(node);
      count += 1;
    });
    res.send(context);
  });
};

const mkChapterObj = (chapter, count, idxOrder) => {
  let node = {};
  node["title"] = chapter["dataValues"]["title"];
  node["id"] = chapter["dataValues"]["id"];
  node["order"] = chapter["dataValues"]["order"];
  node["check"] = chapter["dataValues"]["check"];
  node["idx"] = count;
  node["idxOrder"] = idxOrder;
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
