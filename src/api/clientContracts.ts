import { apiUrl } from '../consts/Api';
import httpClient from './httpClient';
import { ClientContractsData } from '@interfaces/ClientContractsData';

export const fetchClientContracts = (): Promise<{ data: ClientContractsData[] }> =>
  httpClient.get<{ data: ClientContractsData[] }>(`${apiUrl}/clientContracts/`).then(({ data }) => data);

export const deleteClientContracts = (payload: number[]): Promise<{ data: ClientContractsData[] }> =>
  httpClient
    .delete<{ data: ClientContractsData[] }>(`${apiUrl}/clientContracts/`, { data: payload })
    .then(({ data }) => data);

export const changeClientContractsHttp = (payload: ClientContractsData): Promise<{ data: ClientContractsData[] }> =>
  httpClient
    .put<{ data: ClientContractsData[] }>(`${apiUrl}/clientContracts/`, { data: payload })
    .then(({ data }) => data);

export const createNewClientContracts = (): Promise<{ data: ClientContractsData[] }> =>
  httpClient.post<{ data: ClientContractsData[] }>(`${apiUrl}/clientContracts/`).then(({ data }) => data);
