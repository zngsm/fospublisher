const models = require("../../models");

// 챕터 create
exports.post_pasts_write = async (req, res) => {
  let body = await req.body;
  let chapterPage = 10; // 페이지를 설정하는 기준 생성시 변경
  const book = await models.BookPasts.findOne({
    where: {
      UserId: res.locals.userId,
    },
  });
  let bookId = book.id;
  let checkStatus = body.check;
  let check = false;
  if (checkStatus === "true") {
    check = true;
  }
  body.check = check;
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
    where: { year: year },
  });
  body["page"] = chapterPage;
  body["order"] = count;
  body["BookPastId"] = bookId;
  models.ChapterPasts.create(body).then((result) => {
    res.status(201).json({ id: result["dataValues"]["id"] });
  });
};

// 챕터 update
exports.put_pasts_edit = async (req, res) => {
  let body = await req.body;
  let chapterPage = 10;
  const chapterId = req.params.chapter_id;
  const book = await models.BookPasts.findOne({
    where: {
      UserId: res.locals.userId,
    },
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
  let checkStatus = body.check;
  let check = false;
  if (checkStatus === "true") {
    check = true;
  }
  body.check = check;
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
    } else {
      let pageInfo = {
        page: book.page - data.page + chapterPage,
      };
      models.BookPasts.update(pageInfo, {
        where: { id: bookId },
      });
    }
  }
  body["page"] = chapterPage;
  models.ChapterPasts.update(body, {
    where: { id: chapterId },
  })
    .then(() => {
      res.status(201).json({ success: "저장되었습니다." });
      return;
    })
    .catch(() => {
      res.status(400).json({ error: "잘못된 요청입니다." });
    });
};

// 챕터 read
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
      let context = {};
      context["title"] = result.title;
      context["content"] = result.content;
      context["page"] = result.page;
      res.status(200).send(context);
    })
    .catch(() => {
      res.status(404).json({ error: "존재하지 않는 id 입니다." });
    });
};

// 챕터 delete
exports.delete_pasts_delete = async (req, res) => {
  const chapterId = req.params.chapter_id;
  const data = await models.ChapterPasts.findOne({
    where: { id: chapterId },
  });
  const book = await models.BookPasts.findOne({
    where: { UserId: res.locals.userId },
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
  }).then(() => {
    let pageInfo = {
      page: book.page - data.page,
    };
    models.BookPasts.update(pageInfo, {
      where: { id: book.id },
    });
    res.json({ success: "삭제했습니다." });
  });
};

// 책 CRUD
exports.get_pasts_read = async (req, res) => {
  const context = {};
  let book = null;
  await models.BookPasts.findOne({
    where: { UserId: res.locals.userId },
  }).then((result) => {
    context["title"] = result["dataValues"]["title"];
    context["page"] = result["dataValues"]["page"];
    context["id"] = result["dataValues"]["id"];
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
      let chap = {};
      chap["title"] = chapter["dataValues"]["title"];
      chap["content"] = chapter["dataValues"]["content"];
      chap["page"] = chapter["dataValues"]["page"];
      chap["year"] = chapter["dataValues"]["year"];
      chap["id"] = chapter["dataValues"]["id"];
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
