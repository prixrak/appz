import { AsyncData } from '@interfaces/AsyncData';
import { Guard } from '@interfaces/Guard';

export interface State {
  guards: AsyncData<Guard[]>;
}
