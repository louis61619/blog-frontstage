import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:7001',
  timeout: 5000,
})

instance.interceptors.request.use(config => {
  return config
}, err => {
})

instance.interceptors.response.use(res => {
  return res.data
}, err => {
  return err
})

export default instance;
