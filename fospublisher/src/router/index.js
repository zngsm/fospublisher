import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Timeline from "../views/Timeline.vue";
import Login from "../views/member/Login.vue";
import FindPassword from "../views/member/FindPassword.vue";
import ChangePassword from "../views/member/ChangePassword.vue";
import Register from "../views/member/Register.vue";
import CheckPassword from "../views/member/CheckPassword.vue";
import Main from "../views/past/Main.vue";
import CreatePast from "../views/past/CreatePast.vue";
import ReadPast from "../components/book/ReadPast.vue";
import Design from "../components/book/Design.vue";
import Demo from "../views/Demo.vue";
import Library from "../views/Library.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter(to, from, next) {
      if (localStorage.getItem("userId")) {
        next();
      } else {
        console.log("홈", localStorage.getItem("userId"));
        console.log(localStorage.getItem("token"));
        console.log(localStorage.getItem("refreshToken"));
        next({ name: "Login" });
      }
    },
  },
  {
    path: "/timeline",
    name: "Timeline",
    component: Timeline,
    beforeEnter(to, from, next) {
      if (localStorage.getItem("userId")) {
        next();
      } else {
        next({ name: "Login" });
      }
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    // beforeEnter(to, from, next) {
    //   console.log("로그인", localStorage.getItem("userId"));
    //   console.log(localStorage.getItem("token"));
    //   console.log(localStorage.getItem("refreshToken"));

    //   if (localStorage.getItem("userId")) {
    //     next({ name: "Main" });
    //   } else {
    //     next();
    //   }
    // },
  },
  {
    path: "/findPassword",
    name: "FindPassword",
    component: FindPassword,
    beforeEnter(to, from, next) {
      if (localStorage.getItem("userId")) {
        next({ name: "Main" });
      } else {
        next();
      }
    },
  },
  {
    path: "/changePassword",
    name: "ChangePassword",
    component: ChangePassword,
    props: true,
    beforeEnter: (to, from, next) => {
      if (
        localStorage.getItem("userId") &&
        localStorage.getItem("tempUserId") === null &&
        localStorage.getItem("tempAccept")
      ) {
        next();
      } else if (
        localStorage.getItem("userId") === null &&
        localStorage.getItem("tempUserId") === null
      ) {
        next({ name: "Login" });
      } else if (
        localStorage.getItem("userId") &&
        localStorage.getItem("tempUserId") === null &&
        localStorage.getItem("tempAccept") === null
      ) {
        next(false);
      } else {
        next();
      }
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    // beforeEnter: (to, from, next) => {
    //   if (localStorage.getItem("userId")) {
    //     next({ name: "Main" });
    //   } else {
    //     next();
    //   }
    // },
  },
  {
    path: "/checkPassword",
    name: "CheckPassword",
    component: CheckPassword,
    beforeEnter(to, from, next) {
      if (localStorage.getItem("userId")) {
        next();
      } else {
        next({ name: "Login" });
      }
    },
  },
  {
    path: "/main",
    name: "Main",
    component: Main,
    beforeEnter(to, from, next) {
      if (localStorage.getItem("userId")) {
        next();
      } else {
        console.log("메인", localStorage.getItem("userId"));
        console.log(localStorage.getItem("token"));
        console.log(localStorage.getItem("refreshToken"));
        next({ name: "Login" });
      }
    },
  },
  {
    path: "/read",
    name: "ReadPast",
    component: ReadPast,
    props: true,
    // beforeEnter(to, from, next) {
    //   if (localStorage.getItem("userId")) {
    //     next();
    //   } else {
    //     next({ name: "Login" });
    //   }
    // },
  },
  {
    path: "/create",
    name: "CreatePast",
    component: CreatePast,
    props: true,
    // beforeEnter(to, from, next) {
    //   if (localStorage.getItem("userId")) {
    //     next();
    //   } else {
    //     next({ name: "Login" });
    //   }
    // },
  },
  {
    path: "/design",
    name: "Design",
    component: Design,
    props: true,
    // beforeEnter(to, from, next) {
    //   if (localStorage.getItem("userId")) {
    //     next();
    //   } else {
    //     next({ name: "Login" });
    //   }
    // },
  },
  {
    path: "/demo",
    name: "Demo",
    component: Demo,
  },
  {
    path: "/library",
    name: "Library",
    component: Library,
    // beforeEnter(to, from, next) {
    //   if (localStorage.getItem("userId")) {
    //     next();
    //   } else {
    //     next({ name: "Login" });
    //   }
    // },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
