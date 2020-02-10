import axios from "axios";
import { getCookie } from "../utils/cookie.js";
import config from "../config";

const isDev = process.env.NODE_ENV !== "production";
const sessionKey = "drupal:session";
const apiServer = isDev ? config.dev.apiServer : config.prod.apiServer;

function request(isAdmin) {
  const session = getCookie(sessionKey);
  const sessionValue = session ? JSON.parse(session) : "";
  const csrfToken = ((sessionValue || "").authenticated || "").csrf_token || "";
  // const csrfToken = getCookie('drupal:session:token');
  const basicAuthToken = ((sessionValue || "").authenticated || "").basic_auth || "";
  let api;

  if (isAdmin) {
    api = axios.create({
      baseURL: apiServer,
      timeout: 10000
    });
  } else {
    api = axios.create({
      baseURL: apiServer,
      timeout: 10000,
      headers: {
        'Authorization': basicAuthToken,
        'X-CSRF-Token': csrfToken,
      },
      params: {}
    });
  }


  // http request 拦截器
  api.interceptors.request.use(config => {
    if (config.url === 'rest/session/token') {
      config.headers.Authorization = ''
      config.headers['X-CSRF-Token'] = ''
    }

    return config
  }, error => {
    return Promise.reject(error)
  })

// http response 拦截器
  api.interceptors.response.use(response => {
    return response
  }, error => {
    return Promise.reject(error)
  })

  return api;
}

export { request, apiServer };
