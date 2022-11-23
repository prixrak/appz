import { AddressesData } from '@interfaces/AddressesData';
import { AsyncData } from '@interfaces/AsyncData';
import { Guard } from '@interfaces/Guard';

export interface State {
  guards: AsyncData<Guard[]>;
  addresses: AsyncData<AddressesData>;
}
