import { AsyncData } from '@interfaces/AsyncData';
import { ClientData } from '@interfaces/ClientData';
import { ClientContractsData } from '@interfaces/ClientContractsData';
import { createAction } from '@reduxjs/toolkit';
import { Service } from '@interfaces/Service';
import { ServiceToContact } from '../../../interfaces/ServiceToContact';

export const setClientContracts = createAction<AsyncData<ClientContractsData[]>>('clientContracts/setClientContracts');
export const getClientContracts = createAction<void>('clientContracts/getClientContracts');
export const setSelectedElementsAction = createAction<number[]>('clientContracts/setSelectedElementsAction');
export const changeClientContractsAction = createAction<ClientContractsData>(
  'clientContracts/changeClientContractsAction'
);
export const createClientContract = createAction<void>('clientContracts/createClientContract');

export const changeClientAction = createAction<ClientData>('clientContracts/changeClientAction');
export const getServices = createAction<Service>('clientContracts/getServices');
export const addServicesAction = createAction<ServiceToContact>('clientContracts/addServicesAction');
