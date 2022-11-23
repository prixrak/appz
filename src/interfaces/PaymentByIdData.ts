export interface PaymentByIdData {
  id: number;
  contracId: number;
  totalBonus: number;
  totalSalary: number;
  startDate: string;
  endDate: string;
  transactionDate?: string;
}
