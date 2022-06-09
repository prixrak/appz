import { ClientData } from './ClientData';
import { Service } from './Service';

export interface ClientContractsData {
  id: number;
  client: ClientData | null;
  startDate: string | null;
  endDate: string | null;
  services: Service[] | null;
}
