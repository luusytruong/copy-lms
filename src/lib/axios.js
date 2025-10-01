import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api",
  auth: {
    username: "admin@example.com",
    password: "123456",
  },
  withCredentials: true,
  validateStatus: (status) => status >= 200 && status < 500,
});

export default instance;
