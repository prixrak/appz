import { Bonus } from './Bonus';

export interface PaymentsData {
  id: number;
  fullName: string;
  email: string;
  baseSalary: number;
  bonuses: Bonus[];
}
