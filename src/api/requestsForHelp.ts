import { apiUrl } from '../consts/Api';
import httpClient from './httpClient';
import { RequestForHelpData } from '@interfaces/RequestForHelpData';

export const fetchRequestsForHelp = (): Promise<{ data: RequestForHelpData[] }> =>
  httpClient.get<{ data: { data: RequestForHelpData[] } }>(`${apiUrl}/requests/`).then(({ data }) => data.data);
