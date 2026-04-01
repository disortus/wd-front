import api from "./client"



export async function registerRequest(data) {

  const res = await api.post("/auth/register", data)

  return res.data

}



export async function loginRequest(data) {

  const res = await api.post("/auth/login", data)

  return res.data

}



export async function getMeRequest() {

  const res = await api.get("/profile/me")

  return res.data

}