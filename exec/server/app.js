const AdminBro = require("admin-bro");
const AdminBroSequelize = require("@admin-bro/sequelize");
const AdminBroExpress = require("@admin-bro/express");
const createError = require("http-errors");
const express = require("express");
const dotenv = require("dotenv");

dotenv.config(); //LOAD CONFIG

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

AdminBro.registerAdapter(AdminBroSequelize);

const db = require("./models");
const adminBro = new AdminBro({
  databases: [db],
  rootPath: "/api/admin",
  logoutPath: "/api/admin/exit",
  loginPath: "/api/admin/login",
});

const ADMIN = {
  email: ADMIN_EMAIL,
  password: ADMIN_PASSWORD,
};

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  authenticate: async (email, password) => {
    if (ADMIN.password === password && ADMIN.email === email) {
      return ADMIN;
    }
    return null;
  },
  cookieName: "adminBro",
  cookiePassword: "testtest",
});

const nunjucks = require("nunjucks");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

class App {
  constructor() {
    this.app = express();
    // db 접속
    this.dbConnection();
    // 뷰엔진 셋팅
    this.setViewEngine();
    // 미들웨어 셋팅
    this.setMiddleWare();
    // 정적 디렉토리 추가
    this.setStatic();
    // 로컬 변수
    this.setLocals();
    // 라우팅
    this.getRouting();
    // 404 페이지를 찾을수가 없음
    this.status404();
    // 에러처리
    this.errorHandler();
  }

  dbConnection() {
    // DB authentication
    db.sequelize
      .authenticate()
      .then(() => {
        console.log("Connection has been established successfully.");
        // return db.sequelize.sync();
      })
      .then(() => {
        console.log("DB Sync compconste.");
      })
      .catch((err) => {
        console.error("Unable to connect to the database:", err);
      });
  }

  setMiddleWare() {
    // 미들웨어 셋팅
    this.app.use(logger("dev"));
    this.app.use(adminBro.options.rootPath, router);
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(
      cors({
        origin: true,
        credentials: true,
      })
    );
  }

  setViewEngine() {
    nunjucks.configure("template", {
      autoescape: true,
      express: this.app,
    });
  }

  setStatic() {
    //static 폴더
    this.app.use(express.static(__dirname + "/public/"));
  }

  setLocals() {
    // 템플릿 변수
  }

  getRouting() {
    this.app.use(require("./controllers"));
  }

  status404() {
    // this.app.use( ( req , res, _ ) => {
    //   res.status(404).render('common/404.html')
    // });
  }

  errorHandler() {
    // this.app.use( (err, req, res,  _ ) => {
    //   res.status(500).render('common/500.html')
    // });
  }
}

module.exports = new App().app;
