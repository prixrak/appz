import { AsyncData } from '@interfaces/AsyncData';
import { PaymentsData } from '@interfaces/PaymentsData';

export interface State {
  payments: AsyncData<PaymentsData[]>;
}
