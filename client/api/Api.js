import axios from "axios";
// import { baseUrl } from "../config";

const apiPath = "/__api__/__";

const getApi = (baseUrl) =>
  axios.create({
    baseURL: `${baseUrl}${apiPath}`,
    timeout: 30000,
    withCredentials: true,
    transformRequest: [(data) => JSON.stringify(data)],
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });

const getApiText = (baseUrl) =>
  axios.create({
    baseURL: `${baseUrl}${apiPath}`,
    timeout: 30000,
  });

export { getApi, getApiText, apiPath };
