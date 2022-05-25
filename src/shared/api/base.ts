import axios from 'axios';
import { API_URL } from '../ui/config';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export const apiInstance = {
  get: axiosInstance.get,
  post: axiosInstance.post,
  put: axiosInstance.put,
  delete: axiosInstance.delete,
};
