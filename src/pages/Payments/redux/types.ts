import { AsyncData } from '@interfaces/AsyncData';
import { Bonus } from '@interfaces/Bonus';
import { PaymentsData } from '@interfaces/PaymentsData';

export interface State {
  payments: AsyncData<PaymentsData[]>;
  allBonuses: AsyncData<Bonus[]>;
}
