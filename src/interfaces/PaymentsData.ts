import { Bonus } from './Bonus';
import { PaymentByIdData } from './PaymentByIdData';

export interface PaymentsData {
  id: number;
  fullName: string;
  email: string;
  baseSalary: number;
  bonuses: Bonus[];
  payments: PaymentByIdData[];
  iban: string;
  cardNumber: string;
}
