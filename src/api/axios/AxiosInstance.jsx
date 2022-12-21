import axios from "axios";

const config = {
  baseURL: "http://127.0.0.1:8000/api",
  Headers: {
    "Content-Type": "application/json",
  },
};
const axiosInstance = axios.create(config);

export default axiosInstance;
