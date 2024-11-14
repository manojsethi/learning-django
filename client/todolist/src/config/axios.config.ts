import { Axios } from "axios";

const axiosInstance = new Axios({
  baseURL: "http://localhost:8000/api",
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json";
    // config.headers["Referrer-Policy"] = "no-referrer";
    // config.headers["Cross-Origin-Opener-Policy"] = "same-origin";

    config.data = JSON.stringify(config.data);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    response.data = JSON.parse(response.data);

    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
