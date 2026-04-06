import client from "./client.js";

export const developerApi = {
  // Logs
  getLogs: (params) => client.get("/developer/logs", { params }),
  getLogStats: (params) => client.get("/developer/logs/stats", { params }),
};

export default developerApi;
