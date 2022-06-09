import { apiUrl } from '../consts/Api';
import { User } from '../interfaces/User';
import httpClient from './httpClient';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from '@helpers/auth';

export const fetchCurrentUser = (): Promise<{ data: User }> =>
  httpClient.get<{ data: User }>(`${apiUrl}/user/auth`).then(({ data }) => data);

export const loginUserHttp = (payload: User): Promise<{ data: User }> =>
  httpClient.post<{ token: string }>(`${apiUrl}/user/login/`, payload).then(({ data }) => {
    setAuthToken(data.token);
    return jwt_decode(data.token);
  });

export const registrationUser = (payload: User): Promise<{ data: User }> =>
  httpClient.post<{ token: string }>(`${apiUrl}/user/registration/`, payload).then(({ data }) => {
    setAuthToken(data.token);
    return jwt_decode(data.token);
  });

export const checkUserValidHttp = (): Promise<{ data: User }> =>
  httpClient.get<{ token: string }>(`${apiUrl}/user/auth`).then(({ data }) => {
    setAuthToken(data.token);
    return jwt_decode(data.token);
  });
