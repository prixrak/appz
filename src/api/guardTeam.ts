import { apiUrl } from '../consts/Api';
import httpClient from './httpClient';
import { GuardTeamData } from '@interfaces/GuardTeamData';

export const fetchGuardTeam = (): Promise<{ data: GuardTeamData[] }> =>
  httpClient.get<{ data: GuardTeamData[] }>(`${apiUrl}/guardTeam/`).then(({ data }) => data);
