import { GuardContract } from '@interfaces/GuardContract';
import { GuardsContractsData } from '@interfaces/GuardSContracts';
import { apiUrl } from '../consts/Api';
import httpClient from './httpClient';

export const fetchGuardsContracts = (): Promise<{ data: GuardsContractsData }> =>
  httpClient.get<{ data: GuardsContractsData }>(`${apiUrl}/guardsContracts/`).then(({ data }) => data);

export const deleteGuardsContracts = (payload: number[]): Promise<{ data: GuardsContractsData }> =>
  httpClient
    .delete<{ data: GuardsContractsData }>(`${apiUrl}/guardsContracts/`, { data: payload })
    .then(({ data }) => data);

export const changeGuardContractHttp = (payload: GuardContract): Promise<{ data: GuardContract }> =>
  httpClient.put<{ data: GuardContract }>(`${apiUrl}/guardsContracts/`, { data: payload }).then(({ data }) => data);

export const createNewContract = (payload: string): Promise<{ data: string }> =>
  httpClient.post<{ data: string }>(`${apiUrl}/guardsContracts/`, { data: payload }).then(({ data }) => data);
