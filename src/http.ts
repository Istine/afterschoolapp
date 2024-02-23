import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://ec2-18-222-82-204.us-east-2.compute.amazonaws.com/api", // The base URL for all requests made with this instance
  timeout: 60000 * 30, // Timeout for requests in milliseconds
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosInstance;
