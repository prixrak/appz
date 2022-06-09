import { AsyncData } from '@interfaces/AsyncData';
import { GuardTeamData } from '@interfaces/GuardTeamData';
import { createAction } from '@reduxjs/toolkit';

export const setGuardTeam = createAction<AsyncData<GuardTeamData[]>>('guardTeam/setGuardTeam');
export const getGuardTeam = createAction<void>('guardTeam/getGuardTeam');
