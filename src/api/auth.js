import client from "./client.js";

export const authApi = {
  login: (data) => client.post("/auth/login", data),
  register: (data) => client.post("/auth/register", data),
};