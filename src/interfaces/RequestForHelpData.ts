import { RefugeeData } from './RefugeeData';

export interface RequestForHelpData {
  id: number;
  type: string;
  title: string;
  status: string;
  description: null;
  number_of_people: number;
  with_pets: null;
  worker: {
    id: number;
    name: string;
    email: string;
  };
  refugee: RefugeeData;
}
