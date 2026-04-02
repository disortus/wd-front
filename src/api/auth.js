import client from "./client"

export const authApi = {
  login: (data) =>
    client.post("/auth/login", data),
  register: (data) =>
    client.post("/auth/register", data),
  logout: () =>
    client.post("/auth/logout"),
  me: () =>
    client.get("/public/profile/me"),
}