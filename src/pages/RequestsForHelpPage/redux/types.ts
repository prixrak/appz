import { AsyncData } from '@interfaces/AsyncData';
import { FilterInfo } from '@interfaces/FilterInfo';
import { RequestForHelpData } from '@interfaces/RequestForHelpData';
import { SortInfo } from '@interfaces/SortInfo';

export interface State {
  requestForHelp: AsyncData<RequestForHelpData[]>;
  sortInfo: SortInfo;
  filterInfo: FilterInfo[];
}
