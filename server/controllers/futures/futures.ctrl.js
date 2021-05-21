const { Sequelize } = require("sequelize");
const models = require("../../models");

exports.post_futures_write = async (req, res) => {
  let body = await req.body;
  let cutter = "html2pdf__page-break";
  let chapterPage = body.content.split(cutter).length;
  const book = await models.BookFutures.findOne({
    where: {
      UserId: res.locals.userId,
    },
  });
  let bookId = book.id;
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
    } else if (!body.month) {
      res.status(400).json({ error: "월을 입력해주세요" });
      return;
    } else if (!body.day) {
      res.status(400).json({ error: "날짜를 입력해주세요" });
      return;
    } else {
      let pageInfo = {
        page: book.page + chapterPage,
      };
      await models.BookFutures.update(pageInfo, {
        where: { id: bookId },
      });
    }
  }
  body["page"] = chapterPage;
  body["BookFutureId"] = bookId;
  models.ChapterFutures.create(body)
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

exports.get_futures_chapter_read = async (req, res) => {
  const chapterId = req.params.chapter_id;
  const book = await models.BookFutures.findOne({
    where: {
      UserId: res.locals.userId,
    },
  });
  models.ChapterFutures.findOne({
    where: { id: chapterId },
  })
    .then((result) => {
      if (result.BookFutureId !== book.id) {
        res.status(403).json({ error: "접근권한이 없습니다." });
        return;
      }
      let context = result.dataValues;
      delete context["id"];
      delete context["BookFutureId"];
      delete context["updatedAt"];
      res.status(200).json(context);
    })
    .catch(() => {
      res.status(404).json({ error: "존재하지 않는 id 입니다." });
    });
};

exports.put_futures_edit = async (req, res) => {
  let body = await req.body;
  let cutter = "html2pdf__page-break";
  let chapterPage = body.content.split(cutter).length;
  const chapterId = req.params.chapter_id;
  const book = await models.BookFutures.findOne({
    where: { UserId: res.locals.userId },
  });
  const data = await models.ChapterFutures.findOne({
    where: { id: chapterId },
  });
  if (!data) {
    res.status(404).json({ error: "존재하지 않는 id 입니다." });
    return;
  } else if (book.id !== data.BookFutureId) {
    res.status(403).json({ error: "접근 권한이 없습니다." });
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
    } else if (!body.month) {
      res.status(400).json({ error: "월을 입력해주세요" });
      return;
    } else if (!body.day) {
      res.status(400).json({ error: "날짜를 입력해주세요" });
      return;
    }
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
  models.BookFutures.update(pageInfo, {
    where: { id: book.id },
  });
  body["page"] = chapterPage;
  models.ChapterFutures.update(body, {
    where: { id: chapterId },
  })
    .then(() => {
      if (check) {
        res.status(201).json({ success: "저장되었습니다." });
      } else {
        let updated = String(data["updatedAt"]);
        res.status(202).json({
          success: "자동저장되었습니다.",
          update: updated.split(" ")[1],
        });
      }
    })
    .catch(() => {
      res.status(400).json({ error: "잘못된 요청입니다." });
    });
};

exports.delete_futures_delete = async (req, res) => {
  const chapterId = req.params.chapter_id;
  const book = await models.BookFutures.findOne({
    where: { UserId: res.locals.userId },
  });
  const data = await models.ChapterFutures.findOne({
    where: { id: chapterId },
  });
  if (!data) {
    res.status(404).json({ error: "존재하지 않는 id 입니다." });
    return;
  } else if (book.id !== data.BookFutureId) {
    res.status(403).json({ error: "접근권한이 없습니다." });
    return;
  }
  models.ChapterFutures.destroy({
    where: { id: chapterId },
  })
    .then(() => {
      let pageInfo = {
        page: book.page - data.page,
      };
      models.BookFutures.update(pageInfo, {
        where: { id: book.id },
      });
      res.json({ success: "삭제했습니다." });
    })
    .catch(() => {
      res.status(404).json({ error: "존재하지 않는 id 입니다." });
    });
};

exports.get_futures_read = async (req, res) => {
  let today = new Date();
  let todayYear = today.getFullYear();
  let todayMonth = today.getMonth() + 1;
  let todayDate = today.getDate();
  const context = {};
  let book = null;
  await models.BookFutures.findOne({
    where: { UserId: res.locals.userId },
  }).then((result) => {
    context["cover"] = result["dataValues"];
    delete context["cover"]["updatedAt"];
    delete context["cover"]["UserId"];
    book = result;
  });
  await models.ChapterFutures.findAll({
    where: {
      BookFutureId: book.id,
      check: true,
      [Sequelize.Op.or]: [
        { year: { [Sequelize.Op.lt]: todayYear } },
        { year: todayYear, month: { [Sequelize.Op.lt]: todayMonth } },
        {
          year: todayYear,
          month: todayMonth,
          day: { [Sequelize.Op.lte]: todayDate },
        },
      ],
    },
    order: [["year"], ["month"], ["day"]],
  }).then((result) => {
    const content = [];
    const list = {};
    let pageStart = 0;
    result.forEach((chapter) => {
      let chap = chapter["dataValues"];
      delete chap["updatedAt"];
      delete chap["BookFutureId"];
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

exports.put_futures_read = (req, res) => {
  let body = req.body;
  models.BookFutures.update(body, {
    where: { UserId: res.locals.userId },
  }).then(() => {
    res.status(201).json({ success: "수정되었습니다." });
  });
};

exports.check_futures = async (req, res) => {
  let year = req.body.year;
  let month = req.body.month;
  let day = req.body.day;
  let book = await models.BookFutures.findOne({
    where: { UserId: res.locals.userId },
  });
  models.ChapterFutures.findAll({
    where: { BookFutureId: book.id, year: year, month: month, day: day },
  }).then((result) => {
    let context = [];
    result.forEach((chapter) => {
      let cont = {};
      cont["id"] = chapter.id;
      cont["title"] = chapter.title;
      context.push(cont);
    });
    res.status(200).json({ count: context.length, data: context });
  });
};

exports.get_futures_cover = async (req, res) => {
  await models.BookFutures.findOne({
    where: { UserId: res.locals.userId },
  })
    .then((result) => {
      res.send(result);
    })
    .catch(() => {
      res.status(404).send({ error: "책 정보를 찾을 수 없습니다." });
    });
};
