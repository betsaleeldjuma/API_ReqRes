import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://reqres.in/api",
    headers: {"Content-Type": "application/json"}
})

apiClient.interceptors.request.use(
  (config) => {
    config.headers.Authorization = "Bearer " + localStorage.getItem("token")
    return config
  }
)

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Token invalide")
    }
    return Promise.reject(error)
  }
)

export default apiClient