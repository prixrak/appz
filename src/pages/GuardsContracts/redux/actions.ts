import { AsyncData } from '@interfaces/AsyncData';
import { GuardContract } from '@interfaces/GuardContract';
import { GuardsContractsData } from '@interfaces/GuardSContracts';
import { createAction } from '@reduxjs/toolkit';

export const setGuardsContracts = createAction<AsyncData<GuardsContractsData>>('guardsContracts/setGuardsContracts');
export const getGuardsContracts = createAction<void>('guardsContracts/getGuardsContracts');
export const setSelectedElementsAction = createAction<number[]>('guardsContracts/setSelectedElementsAction');
export const changeGuardContractAction = createAction<GuardContract>('guardsContracts/changeGuardContractAction');
export const createGuardContract = createAction<string>('guardsContracts/createGuardContract');
export const getAllGuards = createAction<void>('guardsContracts/getAllGuards');
