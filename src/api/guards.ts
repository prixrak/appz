import { apiUrl } from '../consts/Api';
import httpClient from './httpClient';
import { Guard } from '@interfaces/Guard';

export const fetchGuards = (): Promise<{ data: Guard[] }> =>
  httpClient.get<{ data: Guard[] }>(`${apiUrl}/guard/`).then(({ data }) => data);

export const deleteGuards = (payload: number[]): Promise<{ data: Guard[] }> =>
  httpClient.delete<{ data: Guard[] }>(`${apiUrl}/guard/`, { data: payload }).then(({ data }) => data);

export const changeGuardHttp = (payload: Guard): Promise<{ data: Guard[] }> =>
  httpClient.put<{ data: Guard[] }>(`${apiUrl}/guard/`, { data: payload }).then(({ data }) => data);

export const createNewGuard = (): Promise<{ data: Guard[] }> =>
  httpClient.post<{ data: Guard[] }>(`${apiUrl}/guard/`).then(({ data }) => data);
