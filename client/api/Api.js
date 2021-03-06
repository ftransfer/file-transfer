import axios from "axios";
// import { baseUrl } from "../config";

const getApi = (baseUrl) =>
  axios.create({
    baseURL: `${baseUrl}/__api__/__`,
    timeout: 30000,
    withCredentials: true,
    transformRequest: [(data) => JSON.stringify(data)],
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });

export { getApi };
