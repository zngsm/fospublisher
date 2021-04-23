const { forEach } = require("../../models");
const models = require("../../models");

exports.post_pasts_write = async (req, res) => {
  let book = await models.BookPasts.findOne({
    where: {
      id: 1,
      // UserId : "내아이디!!"
    },
  });
  console.log("BOOK", book);
  let bookId = 0;
  console.log(bookId);
  if (!book) {
    const nickname = "유저닉네임";
    const context = {
      title: `${nickname} 님의 자서전`,
      page: 0,
    };
    await models.BookPasts.create(context).then((result) => {
      bookId = result["dataValues"]["id"];
    });
  } else {
    bookId = book.id;
  }

  let body = req.body;
  // body["page"] = 30;
  const year = req.body.year;
  const count = await models.ChapterPasts.count({
    where: { year: req.body.year },
  });
  body["order"] = count;
  body["BookPastId"] = bookId;
  models.ChapterPasts.create(body).then((result) => {
    res.status(201).send({ id: result["dataValues"]["id"] });
  });
};

exports.get_pasts_read = async (req, res) => {
  const context = {};
  await models.BookPasts.findOne({
    where: {
      id: 1,
      // UserId : "내아이디!!"
    },
  }).then((book) => {
    context["title"] = book["dataValues"]["title"];
    context["page"] = book["dataValues"]["page"];
    context["id"] = book["dataValues"]["id"];
  });

  await models.ChapterPasts.findAll({
    where: { BookPastId: 1 },
    order: [["year"], ["order"]],
  }).then((result) => {
    const content = [];
    const list = {};
    result.forEach((chapter) => {
      let chap = {};
      chap["title"] = chapter["dataValues"]["title"];
      chap["content"] = chapter["dataValues"]["content"];
      chap["page"] = chapter["dataValues"]["page"];
      chap["year"] = chapter["dataValues"]["year"];
      chap["id"] = chapter["dataValues"]["id"];
      content.push(chap);

      /////////
      const year = chapter["dataValues"]["year"];
      let listChap = {};
      listChap["title"] = chapter["dataValues"]["title"];
      listChap["id"] = chapter["dataValues"]["id"];
      if (year in list === false) {
        list[year] = [];
      }
      list[year].push(listChap);
    });
    context["content"] = content;
    context["list"] = list;
    res.send(context);
  });
};

exports.put_pasts_edit = async (req, res) => {
  const chapterId = req.params.chapter_id;
  const data = await models.ChapterPasts.findOne({
    where: { id: chapterId },
  });
  if (!data) {
    res.status(404).send({ error: "존재하지 않는 id 입니다." });
    return;
  }

  let saveStatus = req.body.save;
  let save = false;
  if (saveStatus === "true") {
    save = true;
  }
  req.body.save = save;
  if (save) {
    if (!req.body.title) {
      res.status(400).send({ error: "제목을 입력해주세요" });
      return;
    } else if (!req.body.content) {
      res.status(400).send({ error: "내용을 입력해주세요" });
      return;
    } else if (!req.body.year) {
      res.status(400).send({ error: "연도를 입력해주세요" });
      return;
    }
  }
  models.ChapterPasts.update(req.body, {
    where: { id: chapterId },
  }).then(() => {
    res.status(201).send({ success: "저장되었습니다." });
  });
};

exports.delete_pasts_delete = async (req, res) => {
  const chapterId = req.params.chapter_id;
  const data = await models.ChapterPasts.findOne({
    where: { id: chapterId },
  });
  if (!data) {
    res.status(404).send({ error: "존재하지 않는 id 입니다." });
    return;
  }
  models.ChapterPasts.destroy({
    where: { id: chapterId },
  }).then(() => {
    res.send({ success: "삭제했습니다." });
  });
};

exports.get_pasts_chapter_read = (req, res) => {
  const chapterId = req.params.chapter_id;
  models.ChapterPasts.findOne({
    where: { id: chapterId },
  }).then((result) => {
    if (result) {
      let context = {};
      context["title"] = result.title;
      context["content"] = result.content;
      context["page"] = result.page;
      res.send(context);
    } else {
      res.status(404).send({ error: "존재하지 않는 id 입니다." });
    }
  });
};
