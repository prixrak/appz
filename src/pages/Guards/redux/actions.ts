import { AsyncData } from '@interfaces/AsyncData';
import { Guard } from '@interfaces/Guard';
import { createAction } from '@reduxjs/toolkit';

export const setGuards = createAction<AsyncData<Guard[]>>('guards/setGuards');
export const getGuards = createAction<void>('guards/getGuards');
export const setSelectedElementsAction = createAction<number[]>('guards/setSelectedElementsAction');
export const changeGuardAction = createAction<Guard>('guards/changeGuard');
export const createGuard = createAction<void>('guards/createGuard');
