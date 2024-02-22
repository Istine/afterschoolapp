import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://18.222.82.204:4000/api", // The base URL for all requests made with this instance
  timeout: 60000 * 30, // Timeout for requests in milliseconds
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosInstance;
