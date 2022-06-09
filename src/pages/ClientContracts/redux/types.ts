import { AsyncData } from '@interfaces/AsyncData';
import { ClientContractsData } from '@interfaces/ClientContractsData';

export interface State {
  clientContracts: AsyncData<ClientContractsData[]>;
}
