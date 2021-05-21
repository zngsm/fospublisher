const models = require("../../models");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const tokenList = {};

dotenv.config(); //LOAD CONFIG

const YOUR_SECRET_KEY = process.env.SECRET_KEY;
const YOUR_REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY;

exports.post_accounts_signup = async (req, res) => {
  let validationErrors = {};

  if (req.body.username === undefined || req.body.username === "" || req.body.username === null) {
    validationErrors["username"] = "아이디는 필수입니다.";
  }
  if (req.body.password === undefined || req.body.password === "" || req.body.password === null) {
    validationErrors["password"] = "비밀번호는 필수입니다.";
  }
  if (req.body.password.length > 0 && req.body.password.length < 8) {
    validationErrors["password"] = "비밀번호는 8자 이상이어야 합니다.";
  }
  if (
    req.body.passwordConfirm === undefined ||
    req.body.passwordConfirm === "" ||
    req.body.passwordConfirm === null
  ) {
    validationErrors["passwordConfirm"] = "비밀번호 확인은 필수입니다.";
  }
  if (req.body.passwordConfirm !== req.body.password) {
    validationErrors["passwordConfirm"] = "비밀번호가 일치하지 않습니다.";
  }
  if (req.body.birthday === undefined || req.body.birthday === "" || req.body.birthday === null) {
    validationErrors["birthday"] = "생일은 필수입니다.";
  }
  if (req.body.nickname === undefined || req.body.nickname === "" || req.body.nickname === null) {
    validationErrors["nickname"] = "닉네임은 필수입니다.";
  }
  if (req.body.question === undefined || req.body.question === "" || req.body.question === null) {
    validationErrors["question"] = "비밀번호 찾기 질문은 필수입니다.";
  }
  if (req.body.answer === undefined || req.body.answer === "" || req.body.answer === null) {
    validationErrors["answer"] = "비밀번호 찾기 답변은 필수입니다.";
  }

  if (Object.keys(validationErrors).length > 0) {
    res.status(422).json({
      result: "failed",
      data: validationErrors,
    });
    return;
  }

  let body = await req.body;
  let inputPassword = await body.password;
  let salt = (await Math.round(new Date().valueOf() * Math.random())) + "";
  let hashPassword = await crypto
    .createHash("sha512")
    .update(inputPassword + salt)
    .digest("hex");

  let imgUrl = "";
  if (body.img === "") {
    imgUrl = "https://autobiography.s3.ap-northeast-2.amazonaws.com/1619527735710.png";
  } else {
    imgUrl = body.img;
  }

  try {
    await models.Users.create({
      username: body.username,
      password: hashPassword,
      salt: salt,
      birthday: body.birthday,
      nickname: body.nickname,
      introduce: body.introduce,
      img: imgUrl,
      question: body.question,
      answer: body.answer,
    })
      .then(async () => {
        let result = await models.Users.findOne({
          where: {
            username: body.username,
          },
        });

        const nickname = result.dataValues.nickname;

        await models.BookPasts.create({
          title: `${nickname}님의 자서전`,
          UserId: result.dataValues.id,
        });

        await models.BookFutures.create({
          title: `${nickname}님의 미래예측 자서전`,
          UserId: result.dataValues.id,
        });

        res.status(201).json({
          result: "회원가입에 성공하였습니다.",
          userId: result.dataValues.id,
        });
      })
      .catch(() => {
        res.status(400).send("잘못된 요청입니다.");
      });
  } catch {
    res.status(400).send("잘못된 요청입니다.");
  }
};

exports.post_accounts_login = async (req, res) => {
  let validationErrors = {};

  if (req.body.username === undefined || req.body.username === "" || req.body.username === null) {
    validationErrors["username"] = "아이디는 필수입니다.";
  }
  if (req.body.password === undefined || req.body.password === "" || req.body.password === null) {
    validationErrors["password"] = "비밀번호는 필수입니다.";
  }
  if (req.body.password.length > 0 && req.body.password.length < 8) {
    validationErrors["password"] = "비밀번호는 8자 이상이어야 합니다.";
  }
  if (Object.keys(validationErrors).length > 0) {
    res.status(422).json({
      result: "failed",
      data: validationErrors,
    });
    return;
  }

  let body = await req.body;

  try {
    let result = await models.Users.findOne({
      where: {
        username: body.username,
      },
    });

    if (result !== null) {
      let dbPassword = await result.dataValues.password;
      let inputPassword = await body.password;
      let salt = await result.dataValues.salt;
      let hashPassword = await crypto
        .createHash("sha512")
        .update(inputPassword + salt)
        .digest("hex");

      if (dbPassword === hashPassword) {
        const token = jwt.sign(
          {
            userId: result.dataValues.id,
          },
          YOUR_SECRET_KEY,
          {
            expiresIn: "24h",
          }
        );

        const refreshToken = jwt.sign(
          {
            userId: result.dataValues.id,
          },
          YOUR_REFRESH_SECRET_KEY,
          {
            expiresIn: "168h",
          }
        );

        const response = {
          status: "Logged in",
          token: token,
          refreshToken: refreshToken,
        };

        tokenList[refreshToken] = response;

        res.cookie("user", token);
        res.status(201).json({
          result: "로그인에 성공하였습니다.",
          userId: result.dataValues.id,
          token,
          refreshToken,
        });
      } else {
        res.status(400).json({ error: "비밀번호가 잘못되었습니다." });
      }
    } else {
      res.status(400).json({ error: "없는 회원입니다." });
    }
  } catch {
    res.status(400).send("잘못된 요청입니다.");
  }
};

exports.put_accounts_user_edit = async (req, res) => {
  let validationErrors = {};

  if (req.body.birthday === undefined || req.body.birthday === "" || req.body.birthday === null) {
    validationErrors["birthday"] = "생일은 필수입니다.";
  }
  if (req.body.nickname === undefined || req.body.nickname === "" || req.body.nickname === null) {
    validationErrors["nickname"] = "닉네임은 필수입니다.";
  }

  if (Object.keys(validationErrors).length > 0) {
    res.status(422).json({
      result: "failed",
      data: validationErrors,
    });
    return;
  }

  let body = await req.body;

  let imgUrl = "";
  if (body.img === "") {
    imgUrl = "https://autobiography.s3.ap-northeast-2.amazonaws.com/1619527735710.png";
  } else {
    imgUrl = body.img;
  }

  await models.Users.update(
    {
      nickname: body.nickname,
      birthday: body.birthday,
      img: imgUrl,
      introduce: body.introduce,
    },
    {
      where: {
        id: res.locals.userId,
      },
    }
  )
    .then(() => {
      res.status(201).json({ result: "정보 업데이트 성공" });
    })
    .catch(() => {
      res.status(400).send("잘못된 요청입니다.");
    });
};

exports.post_accounts_password_confirm = async (req, res) => {
  let body = await req.body;
  let inputPassword = await body.password;

  const user = await models.Users.findOne({
    where: {
      id: res.locals.userId,
    },
  });

  let hashPassword = await crypto
    .createHash("sha512")
    .update(inputPassword + user.dataValues.salt)
    .digest("hex");

  if (hashPassword === user.dataValues.password) {
    res.status(200).json({ result: "OK", userId: user.dataValues.id });
  } else {
    res.status(400).json({ result: "BAD REQUEST" });
  }
};

exports.put_accounts_password_edit = async (req, res) => {
  let validationErrors = {};

  if (req.body.password === undefined || req.body.password === "" || req.body.password === null) {
    validationErrors["password"] = "비밀번호는 필수입니다.";
  }
  if (req.body.password.length > 0 && req.body.password.length < 8) {
    validationErrors["password"] = "비밀번호는 8자 이상이어야 합니다.";
  }
  if (
    req.body.passwordConfirm === undefined ||
    req.body.passwordConfirm === "" ||
    req.body.passwordConfirm === null
  ) {
    validationErrors["passwordConfirm"] = "비밀번호 확인은 필수입니다.";
  }
  if (req.body.passwordConfirm !== req.body.password) {
    validationErrors["passwordConfirm"] = "비밀번호가 일치하지 않습니다.";
  }
  if (Object.keys(validationErrors).length > 0) {
    res.status(422).json({
      result: "failed",
      data: validationErrors,
    });
    return;
  }

  let body = await req.body;
  let inputPassword = await body.password;
  let salt = (await Math.round(new Date().valueOf() * Math.random())) + "";
  let hashPassword = await crypto
    .createHash("sha512")
    .update(inputPassword + salt)
    .digest("hex");

  await models.Users.update(
    {
      password: hashPassword,
      salt: salt,
    },
    {
      where: {
        id: body.userId,
      },
    }
  )
    .then(() => {
      res.status(201).json({ result: "비밀번호 업데이트 성공" });
    })
    .catch(() => {
      res.status(400).send("잘못된 요청입니다.");
    });
};

exports.put_accounts_password_question_edit = async (req, res) => {
  let validationErrors = {};

  if (req.body.password === undefined || req.body.password === "" || req.body.password === null) {
    validationErrors["password"] = "비밀번호는 필수입니다.";
  }
  if (req.body.password.length > 0 && req.body.password.length < 8) {
    validationErrors["password"] = "비밀번호는 8자 이상이어야 합니다.";
  }
  if (
    req.body.passwordConfirm === undefined ||
    req.body.passwordConfirm === "" ||
    req.body.passwordConfirm === null
  ) {
    validationErrors["passwordConfirm"] = "비밀번호 확인은 필수입니다.";
  }
  if (req.body.passwordConfirm !== req.body.password) {
    validationErrors["passwordConfirm"] = "비밀번호가 일치하지 않습니다.";
  }

  if (Object.keys(validationErrors).length > 0) {
    res.status(422).json({
      result: "failed",
      data: validationErrors,
    });
    return;
  }

  let body = await req.body;
  let inputPassword = await body.password;
  let salt = (await Math.round(new Date().valueOf() * Math.random())) + "";
  let hashPassword = await crypto
    .createHash("sha512")
    .update(inputPassword + salt)
    .digest("hex");

  await models.Users.update(
    {
      password: hashPassword,
      salt: salt,
      question: body.question,
      answer: body.answer,
    },
    {
      where: {
        id: res.locals.userId,
      },
    }
  )
    .then(() => {
      res.status(201).json({ result: "정보 업데이트 성공" });
    })
    .catch(() => {
      res.status(400).send("잘못된 요청입니다.");
    });
};

exports.post_accounts_question_answer_confirm = async (req, res) => {
  let body = await req.body;

  try {
    let user = await models.Users.findOne({
      where: {
        username: body.username,
      },
    });

    if (user.dataValues.question === body.question && user.dataValues.answer === body.answer) {
      res.status(200).json({ result: "OK", userId: user.dataValues.id });
    } else if (user.dataValues.question !== body.question) {
      res.status(200).json({ result: "FAIL", message: "질문이 일치하지 않습니다." });
    } else if (
      user.dataValues.question === body.question &&
      user.dataValues.answer !== body.answer
    ) {
      res.status(200).json({ result: "FAIL", message: "답변이 일치하지 않습니다." });
    } else {
      res.status(400).json({ result: "BAD REQUEST" });
    }
  } catch {
    res.status(400).send("없는 username입니다.");
  }
};

exports.post_accounts_username_confirm = async (req, res) => {
  let validationErrors = {};

  if (req.body.username === undefined || req.body.username === "" || req.body.username === null) {
    validationErrors["username"] = "아이디는 필수입니다.";
  }
  if (Object.keys(validationErrors).length > 0) {
    res.status(422).json({
      result: "failed",
      data: validationErrors,
    });
    return;
  }
  let body = await req.body;

  try {
    const user = await models.Users.findOne({
      where: {
        username: body.username,
      },
    });

    if (user !== null) {
      res.status(200).json({ result: "중복ID" });
    } else {
      res.status(200).json({ result: "사용가능ID" });
    }
  } catch {
    res.status(400).send("없는 username입니다.");
  }
};

exports.get_accounts_user_info = async (req, res) => {
  try {
    const user = await models.Users.findOne({
      where: {
        id: res.locals.userId,
      },
    });
    res.status(200).json({ user });
  } catch {
    res.status(400).send("잘못된 요청입니다.");
  }
};

exports.post_accounts_token = async (req, res) => {
  let body = await req.body;

  try {
    if (body.refreshToken && body.refreshToken in tokenList) {
      const token = jwt.sign(
        {
          userId: body.userId,
        },
        YOUR_SECRET_KEY,
        {
          expiresIn: "24h",
        }
      );

      const refreshToken = jwt.sign(
        {
          userId: body.userId,
        },
        YOUR_REFRESH_SECRET_KEY,
        {
          expiresIn: "168h",
        }
      );

      const response = {
        status: "Logged in",
        token: token,
        refreshToken: refreshToken,
      };

      tokenList[refreshToken] = response;
      delete tokenList[body.refreshToken];

      res.cookie("user", token);
      res.status(201).json({
        result: "로그인에 성공하였습니다.",
        userId: body.userId,
        token,
        refreshToken,
      });
    } else {
      res.status(404).send("잘못된 요청 혹은 리프레시 토큰이 만료되었습니다.");
    }
  } catch {
    res.status(400).send("리프레시 토큰을 넣어주세요.");
  }
};
