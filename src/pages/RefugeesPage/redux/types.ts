import { AsyncData } from '@interfaces/AsyncData';
import { RefugeeData } from '@interfaces/RefugeeData';
import { SortInfo } from '@interfaces/SortInfo';

export interface State {
  refugees: AsyncData<RefugeeData[]>;
  sortInfo: SortInfo;
}
