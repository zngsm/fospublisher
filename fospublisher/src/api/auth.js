import http from "./http";
import store from "@/store";

export async function login(userid, password) {
  const response = await http.post({
    url: "/login",
    data: {
      userid,
      password,
    },
  });

  // if (response.status == 200) {
  //   store.commit((type: "auth/setToken"), response.data.token);
  // }
  if (response.status == 200) {
    store.commit("auth/setToken", response.data.token);
  }
}
