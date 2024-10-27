import axios from 'axios';

const htttpService = axios.create({
  baseURL: 'http://127.0.0.1:3000/',
});

// 添加请求拦截器
htttpService.interceptors.request.use(function (config) {
  if (config.url === "/user/login") return config;

  const token = localStorage.getItem('accessToken'); // 假设token存储在localStorage中
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // 设置Authorization header
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

// 添加响应拦截器
htttpService.interceptors.response.use(function ({ config, data }) {
  if (config.url === "/user/login") {
    const { accessToken, refreshToken, userInfo } = data.data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    return userInfo;
  }

  return data;
}, function (error) {
  return Promise.reject(error);
});

export default htttpService