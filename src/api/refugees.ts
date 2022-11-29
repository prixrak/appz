import { apiUrl } from '../consts/Api';
import httpClient from './httpClient';
import { RefugeeData } from '@interfaces/RefugeeData';

export const fetchRefugees = (): Promise<{ data: RefugeeData[] }> =>
  httpClient.get<{ data: { data: RefugeeData[] } }>(`${apiUrl}/refugees/`).then(({ data }) => data.data);
