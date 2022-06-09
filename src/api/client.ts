import { apiUrl } from '../consts/Api';
import httpClient from './httpClient';
import { ClientData } from '@interfaces/ClientData';

export const deleteClient = (payload: string[]): Promise<{ data: ClientData[] }> =>
  httpClient.delete<{ data: ClientData[] }>(`${apiUrl}/client/`, { data: payload }).then(({ data }) => data);

export const changeClientHttp = (payload: ClientData): Promise<{ data: ClientData[] }> =>
  httpClient.put<{ data: ClientData[] }>(`${apiUrl}/client/`, { data: payload }).then(({ data }) => data);

export const createNewClient = (): Promise<{ data: ClientData[] }> =>
  httpClient.post<{ data: ClientData[] }>(`${apiUrl}/client/`).then(({ data }) => data);
