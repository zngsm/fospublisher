import http from "./http";

export async function write(title, contenet) {
  return http.post({
    url: "/board",
    data: {
      title,
      content,
    },
  });
}
