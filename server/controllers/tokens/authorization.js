const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config(); //LOAD CONFIG

const YOUR_SECRET_KEY = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
  try {
    const clientToken = req.cookies.user;
    const decoded = jwt.verify(clientToken, YOUR_SECRET_KEY);

    if (decoded) {
      res.locals.username = decoded.username;
      next();
    } else {
      res.status(401).json({error: '승인되지 않았습니다.'});
    }
  } catch (err) {
    res.status(401).json({error: '토큰이 만료되었습니다.'});
  }
};

exports.verifyToken = verifyToken;