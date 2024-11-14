import { Axios } from "axios";

const axiosInstance = new Axios({
  baseURL: "https://21rlbqvm-8000.inc1.devtunnels.ms/api",
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

export default axiosInstance;
