const models = require('../../models');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config(); //LOAD CONFIG

const YOUR_SECRET_KEY = process.env.SECRET_KEY;

exports.post_accounts_signup = async (req, res) => {
  let body = await req.body;
  let inputPassword = await body.password;
  let salt = await Math.round((new Date().valueOf() * Math.random())) + "";
  let hashPassword = await crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

  await models.Users.create({
    username: body.username,
    password: hashPassword,
    salt: salt,
    birthday: body.birthday,
    nickname: body.nickname,
    introduce: body.introduce,
    img: body.img,
    question: body.question,
    answer: body.answer
  })
  .then(async () => {
    let result = await models.Users.findOne({
      where: {
        username: body.username
      }
    });
    res.status(201).json({
      result: '회원가입에 성공하였습니다.',
      username: result.dataValues.username
    });
  })
  .catch(() => {
    res.status(400).send("잘못된 요청입니다.");
  });
}

exports.post_accounts_login = async (req, res) => {
  let body = await req.body;

  try {
    let result = await models.Users.findOne({
      where: {
        username: body.username
      }
    });

    if (result !== null) {
      let dbPassword = await result.dataValues.password;
      let inputPassword = await body.password;
      let salt = await result.dataValues.salt;
      let hashPassword = await crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

      if (dbPassword === hashPassword) {
        const token = jwt.sign({
          username: result.dataValues.username
        }, YOUR_SECRET_KEY, {
          expiresIn: '1h'
        });

        res.cookie('user', token);
        res.status(201).json({
          result: '로그인에 성공하였습니다.',
          username: result.dataValues.username,
          token
        });
      } else {
        res.status(400).json({error: '비밀번호가 잘못되었습니다.'});
      }
    } else {
      res.status(400).json({error: '없는 회원입니다.'});
    }
  } catch {
    res.status(400).send("잘못된 요청입니다.");
  }
}

exports.put_accounts_user_edit = async (req, res) => {
  let body = await req.body;

  await models.Users.update({
    nickname: body.nickname,
    birthday: body.birthday,
    img: body.img,
    introduce: body.introduce
  }, {
    where: {
      username: res.locals.username
    }
  }).then(() => {
    res.status(201).json({result: "정보 업데이트 성공"});
  }).catch(() => {
    res.status(400).send("잘못된 요청입니다.");
  });
}

exports.post_accounts_password_confirm = (req, res) => {

}

exports.put_accounts_password_edit = async (req, res) => {
  let body = await req.body;
  let inputPassword = await body.password;
  let salt = await Math.round((new Date().valueOf() * Math.random())) + "";
  let hashPassword = await crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

  await models.Users.update({
    password: hashPassword,
    salt: salt,
  }, {
    where: {
      username: body.username
    }
  }).then(() => {
    res.status(201).json({result: "비밀번호 업데이트 성공"});
  }).catch(() => {
    res.status(400).send("잘못된 요청입니다.");
  });
}

exports.put_accounts_password_question_edit = async (req, res) => {
  let body = await req.body;
  let inputPassword = await body.password;
  let salt = await Math.round((new Date().valueOf() * Math.random())) + "";
  let hashPassword = await crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

  await models.Users.update({
    password: hashPassword,
    salt: salt,
    question: body.question,
    answer: body.answer
  }, {
    where: {
      username: res.locals.username
    }
  }).then(() => {
    res.status(201).json({result: "정보 업데이트 성공"});
  }).catch(() => {
    res.status(400).send("잘못된 요청입니다.");
  });
}

exports.post_accounts_question_answer_confirm = async (req, res) => {
  let body = await req.body;

  let user = await models.Users.findOne({
    where: {
      username: body.username
    }
  });

  if (user.dataValues.question === body.question && user.dataValues.answer === body.answer) {
    res.status(200).json({result: "OK", username: body.username});
  } else {
    res.status(400).json({result: "BAD REQUEST"});
  }
}

exports.post_accounts_username_confirm = async (req, res) => {
  let body = await req.body;
  const user = await models.Users.findOne({
    where: {
      username: body.username
    }
  });

  if (user !== null) {
    res.status(200).json({result: "중복ID"});
  } else {
    res.status(200).json({result: "사용가능ID"});
  }
}

exports.get_accounts_user_info = async (req, res) => {
  try {
    const user = await models.Users.findOne({
      where: {
        username: res.locals.username
      }
    });
    res.status(200).json({user});
  } catch {
    res.status(400).send("잘못된 요청입니다.");
  }
}