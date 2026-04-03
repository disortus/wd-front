import client, { clearAuthToken, setAuthToken } from "./client.js";

const withTokenPersist = (request) => async (...args) => {
  const response = await request(...args);
  const token = response?.data?.data?.token;

  if (token) {
    setAuthToken(token);
  }

  return response;
};

export const authApi = {
  login: withTokenPersist((data) => client.post("/auth/login", data)),
  register: withTokenPersist((data) => client.post("/auth/register", data)),
  logout: async () => {
    try {
      await client.post("/auth/logout");
    } finally {
      clearAuthToken();
    }
  },
  me: () => client.get("/auth/me"),
};