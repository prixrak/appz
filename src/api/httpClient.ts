import axios from 'axios';
import { apiUrl } from '../consts/Api';
import { getAuthToken } from '../helpers/auth';

const httpClient = axios.create({
  baseURL: apiUrl,
  headers: { Accept: 'Application/Json' },
});

httpClient.interceptors.request.use((config) => {
  const token = getAuthToken();
  const newConfig = { ...config, headers: { ...config.headers, Authorization: token } };
  return newConfig;
});

export default httpClient;
