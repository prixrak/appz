import { apiUrl } from '../consts/Api';
import httpClient from './httpClient';
import { PaymentsData } from '@interfaces/PaymentsData';
import { PaymentForm } from '@interfaces/PaymentForm';
import { Bonus } from '@interfaces/Bonus';
import { BonusesToContract } from '@interfaces/BonusesToContract';

export const fetchPayments = (): Promise<{ data: PaymentsData[] }> =>
  httpClient.get<{ data: PaymentsData[] }>(`${apiUrl}/payments/`).then(({ data }) => data);

export const deletePayments = (payload: number[]): Promise<{ data: PaymentsData[] }> =>
  httpClient.delete<{ data: PaymentsData[] }>(`${apiUrl}/payments/`, { data: payload }).then(({ data }) => data);

export const changePaymentsHttp = (payload: PaymentsData): Promise<{ data: PaymentsData[] }> =>
  httpClient.put<{ data: PaymentsData[] }>(`${apiUrl}/payments/`, { data: payload }).then(({ data }) => data);

export const createNewPayments = (): Promise<{ data: PaymentsData[] }> =>
  httpClient.post<{ data: PaymentsData[] }>(`${apiUrl}/payments/`).then(({ data }) => data);

export const makePaymentHttp = (payload: PaymentForm): Promise<{ data: PaymentsData[] }> =>
  httpClient.post<{ data: PaymentsData[] }>(`${apiUrl}/payments/`, { data: payload }).then(({ data }) => data);

export const fetchBonuses = (): Promise<{ data: Bonus[] }> =>
  httpClient.get<{ data: Bonus[] }>(`${apiUrl}/bonuses/`).then(({ data }) => data);

export const addBonusesApi = (payload: BonusesToContract): Promise<{ data: string[] }> =>
  httpClient.post<{ data: string[] }>(`${apiUrl}/bonuses/`, { data: payload }).then(({ data }) => data);
