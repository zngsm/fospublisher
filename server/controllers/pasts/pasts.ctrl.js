const { Sequelize } = require("sequelize");
const models = require("../../models");

exports.post_pasts_write = async (req, res) => {
  // res.set({ "Access-Control-Allow-Credentials": true });
  let body = await req.body;
  let cutter = "html2pdf__page-break";
  let chapterPage = body.content.split(cutter).length;
  const book = await models.BookPasts.findOne({
    where: {
      UserId: res.locals.userId,
    },
  });
  let bookId = book.id;
  let check = body.check;
  if (check) {
    if (!body.title) {
      return res.status(400).json({ error: "제목을 입력해주세요" });
    } else if (!body.content) {
      return res.status(400).json({ error: "내용을 입력해주세요" });
    } else if (!body.year) {
      return res.status(400).json({ error: "연도를 입력해주세요" });
    } else {
      let pageInfo = {
        page: book.page + chapterPage,
      };
      await models.BookPasts.update(pageInfo, {
        where: { id: bookId },
      });
    }
  }
  const year = body.year;
  const count = await models.ChapterPasts.count({
    where: { year: year, BookPastId: bookId },
  });
  body["page"] = chapterPage;
  body["order"] = count;
  body["BookPastId"] = bookId;
  models.ChapterPasts.create(body)
    .then((result) => {
      if (!check) {
        let updated = String(result["dataValues"]["updatedAt"]);
        res.status(201).json({
          id: result["dataValues"]["id"],
          update: updated.split(" ")[4],
        });
      } else {
        res.status(201).json({ id: result["dataValues"]["id"] });
      }
    })
    .catch(() => {
      res.status(400).json({ error: "잘못된 요청입니다." });
    });
};

exports.get_pasts_chapter_read = async (req, res) => {
  const chapterId = req.params.chapter_id;
  const book = await models.BookPasts.findOne({
    where: {
      UserId: res.locals.userId,
    },
  });
  models.ChapterPasts.findOne({
    where: { id: chapterId },
  })
    .then((result) => {
      if (result.BookPastId !== book.id) {
        res.status(403).json({ error: "접근권한이 없습니다." });
        return;
      }
      let context = result.dataValues;
      delete context["id"];
      delete context["BookPastId"];
      delete context["updatedAt"];
      res.status(200).send(context);
    })
    .catch(() => {
      res.status(404).json({ error: "존재하지 않는 id 입니다." });
    });
};

// 챕터 update
exports.put_pasts_edit = async (req, res) => {
  let body = await req.body;
  let cutter = 'html2pdf__page-break"';
  let chapterPage = body.content.split(cutter).length;
  const chapterId = req.params.chapter_id;
  const book = await models.BookPasts.findOne({
    where: { UserId: res.locals.userId },
  });
  const data = await models.ChapterPasts.findOne({
    where: { id: chapterId },
  });
  if (!data) {
    res.status(404).json({ error: "존재하지 않는 id 입니다." });
    return;
  } else if (data.BookPastId !== book.id) {
    res.status(403).json({ error: "접근 권한이 없습니다." });
    return;
  }
  if (!body.year) {
    res.status(400).json({ error: "연도를 입력해주세요" });
    return;
  }
  let check = body.check;
  if (check) {
    if (!body.title) {
      res.status(400).json({ error: "제목을 입력해주세요" });
      return;
    } else if (!body.content) {
      res.status(400).json({ error: "내용을 입력해주세요" });
      return;
    } else if (!body.year) {
      res.status(400).json({ error: "연도를 입력해주세요" });
      return;
    }
  }
  if (data.year != body.year) {
    const count = await models.ChapterPasts.count({
      where: { year: body.year, BookPastId: book.id },
    });
    body["order"] = count;
    await models.ChapterPasts.findAll({
      where: {
        year: data.year,
        BookPastId: book.id,
        id: { [Sequelize.Op.ne]: chapterId },
      },
      order: [["order"]],
    }).then((result) => {
      for (let i = 0; i < result.length; i++) {
        if (result[i].order != i) {
          models.ChapterPasts.update(
            { order: i },
            {
              where: { id: result[i].id },
            }
          );
        }
      }
    });
  }
  let pageInfo = {};
  if (check && data.check) {
    pageInfo["page"] = book.page - data.page + chapterPage;
  } else if (check && !data.check) {
    pageInfo["page"] = book.page + chapterPage;
  } else if (!check && data.check) {
    pageInfo["page"] = book.page - data.page;
  } else {
    pageInfo["page"] = book.page;
  }
  models.BookPasts.update(pageInfo, {
    where: { id: book.id },
  });
  body["page"] = chapterPage;
  models.ChapterPasts.update(body, {
    where: { id: chapterId },
  })
    .then((result) => {
      if (check) {
        return res.status(201).json({ success: "저장되었습니다." });
      } else {
        let updated = String(data["updatedAt"]);
        return res.status(202).json({
          success: "자동 저장되었습니다.",
          update: updated.split(" ")[1],
        });
      }
    })
    .catch(() => {
      res.status(400).json({ error: "잘못된 요청입니다." });
    });
};

// 챕터 delete
exports.delete_pasts_delete = async (req, res) => {
  const chapterId = req.params.chapter_id;
  const book = await models.BookPasts.findOne({
    where: { UserId: res.locals.userId },
  });
  const data = await models.ChapterPasts.findOne({
    where: { id: chapterId },
  });
  if (!data) {
    res.status(404).json({ error: "존재하지 않는 id 입니다." });
    return;
  } else if (book.id !== data.BookPastId) {
    res.status(403).json({ error: "접근권한이 없습니다." });
    return;
  }
  models.ChapterPasts.destroy({
    where: { id: chapterId },
  })
    .then(() => {
      let pageInfo = {
        page: book.page - data.page,
      };
      models.BookPasts.update(pageInfo, {
        where: { id: book.id },
      });
      res.json({ success: "삭제했습니다." });
    })
    .catch(() => {
      res.status(404).json({ error: "존재하지 않는 id 입니다." });
    });
};

exports.get_pasts_cover = async (req, res) => {
  await models.BookPasts.findOne({
    where: { UserId: res.locals.userId },
  })
    .then((result) => {
      res.send(result);
    })
    .catch(() => {
      res.status(404).send({ error: "책 정보를 찾을 수 없습니다." });
    });
};

exports.get_pasts_read = async (req, res) => {
  const context = {};
  let book = null;
  await models.BookPasts.findOne({
    where: { UserId: res.locals.userId },
  }).then((result) => {
    context["cover"] = result["dataValues"];
    delete context["cover"]["createdAt"];
    delete context["cover"]["updatedAt"];
    delete context["cover"]["UserId"];
    book = result;
  });
  await models.ChapterPasts.findAll({
    where: { BookPastId: book.id, check: true },
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

exports.put_pasts_read = (req, res) => {
  let body = req.body;
  models.BookPasts.update(body, {
    where: { UserId: res.locals.userId },
  }).then(() => {
    res.status(201).json({ success: "수정되었습니다." });
  });
};
