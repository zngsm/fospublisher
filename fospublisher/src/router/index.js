import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Timeline from "../views/Timeline.vue";
import Login from "../views/member/Login.vue";
import FindPassword from "../views/member/FindPassword.vue";
import ChangePassword from "../views/member/ChangePassword.vue";
import Register from "../views/member/Register.vue";
import Main from "../views/past/Main.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/timeline",
    name: "Timeline",
    component: Timeline,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/findPassword",
    name: "FindPassword",
    component: FindPassword,
  },
  {
    path: "/changePassword",
    name: "ChangePassword",
    component: ChangePassword,
    props: true,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/main",
    name: "Main",
    component: Main,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
