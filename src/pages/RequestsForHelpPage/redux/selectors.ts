import { AsyncData } from '@interfaces/AsyncData';
import { RequestForHelpData } from '@interfaces/RequestForHelpData';
import { SortInfo } from '@interfaces/SortInfo';
import { createSelector } from '@reduxjs/toolkit';
import { sortData } from '../../../redux/helpers/sortData';
import { RootState } from 'redux/store';
import { FilterInfo } from '@interfaces/FilterInfo';
import { applyFiltersFunc } from '../helpers/applyFiltersFunc';

const getSortInfo = (state: RootState): SortInfo => state.requestsForHelpReducer.sortInfo;
const getTableData = (state: RootState): AsyncData<RequestForHelpData[]> => state.requestsForHelpReducer.requestForHelp;
const getFilterInfo = (state: RootState): FilterInfo[] => state.requestsForHelpReducer.filterInfo;

export const getFilteredRequestsForHelp = createSelector([getTableData, getFilterInfo], (tableData, filterInfo) =>
  applyFiltersFunc(tableData, filterInfo)
);

export const getRequestsForHelpDataSorted = createSelector(
  [getFilteredRequestsForHelp, getSortInfo],
  ({ state, data }, sortInfo) => ({
    data: data ? sortData(data, sortInfo) : [],
    state,
  })
);
