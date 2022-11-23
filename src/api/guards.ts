import { apiUrl } from '../consts/Api';
import httpClient from './httpClient';
import { Address, Guard } from '@interfaces/Guard';
import { AddressesData } from '@interfaces/AddressesData';

export const fetchGuards = (): Promise<{ data: Guard[] }> =>
  httpClient.get<{ data: Guard[] }>(`${apiUrl}/guard/`).then(({ data }) => data);

export const fetchAddresses = (): Promise<{ data: AddressesData[] }> =>
  httpClient.get<{ data: AddressesData[] }>(`${apiUrl}/addresses/`).then(({ data }) => data);

export const editAddress = (payload: Address): Promise<{ data: Address[] }> =>
  httpClient.put<{ data: Address[] }>(`${apiUrl}/addresses/`, { data: payload }).then(({ data }) => data);

export const deleteGuards = (payload: number[]): Promise<{ data: Guard[] }> =>
  httpClient.delete<{ data: Guard[] }>(`${apiUrl}/guard/`, { data: payload }).then(({ data }) => data);

export const changeGuardHttp = (payload: Guard): Promise<{ data: Guard[] }> =>
  httpClient.put<{ data: Guard[] }>(`${apiUrl}/guard/`, { data: payload }).then(({ data }) => data);

export const createNewGuard = (): Promise<{ data: Guard[] }> =>
  httpClient.post<{ data: Guard[] }>(`${apiUrl}/guard/`).then(({ data }) => data);
