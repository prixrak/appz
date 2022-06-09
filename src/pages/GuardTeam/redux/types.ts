import { AsyncData } from '@interfaces/AsyncData';
import { GuardTeamData } from '@interfaces/GuardTeamData';

export interface State {
  guardTeam: AsyncData<GuardTeamData[]>;
}
