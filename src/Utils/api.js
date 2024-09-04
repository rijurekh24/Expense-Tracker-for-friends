import axios from "axios";

const Api = axios.create({
  baseURL: "https://project-01-37dl.onrender.com/api",
  withCredentials: true,
});

export default Api;
