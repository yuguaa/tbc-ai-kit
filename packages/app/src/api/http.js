import axios from "axios";
const http = axios.create({
  //   baseURL: host,
  timeout: 60000,
});

// 返回数据没有status code 需要特殊处理的接口
const filterResponseList = ["/tbc-rms/manager/deleteFileAndFolder"];

http.interceptors.request.use(
  (config) => {
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  function (response) {
    let { code } = response?.data || {};
    if (
      response.status === 200 &&
      filterResponseList.indexOf(response.config.url) !== -1
    ) {
      return Promise.resolve(response.data);
    }
    if (code !== 1001) {
      return Promise.reject(response.data);
    }
    return Promise.resolve(response.data);
  },
  function (error) {
    console.log("error: ", error);
  }
);

export default http;
