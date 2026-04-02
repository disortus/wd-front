import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

const client = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" }
})

const addAuth = (config) => {
  const token = localStorage.getItem("auth_token")
  if (token) {
    config.headers.Authorization = "Bearer " + token
  }
  return config
}

const handle401 = (error) => {
  if (error.response && error.response.status === 401) {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("user")
    window.location.href = "/login"
  }
  return Promise.reject(error)
}

client.interceptors.request.use(addAuth)
client.interceptors.response.use((r) => r, handle401)

export default client