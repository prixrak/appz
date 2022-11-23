import { AsyncData } from '@interfaces/AsyncData';
import { Guard } from '@interfaces/Guard';
import { GuardsContractsData } from '@interfaces/GuardSContracts';

export interface State {
  guardsContracts: AsyncData<GuardsContractsData>;
  allGuards: AsyncData<Guard[]>;
}
