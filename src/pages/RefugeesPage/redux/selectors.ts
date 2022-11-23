import { AsyncData } from '@interfaces/AsyncData';
import { RefugeeData } from '@interfaces/RefugeeData';
import { SortInfo } from '@interfaces/SortInfo';
import { createSelector } from '@reduxjs/toolkit';
import { sortData } from '../../../redux/helpers/sortData';
import { RootState } from 'redux/store';
import { FilterInfo } from '@interfaces/FilterInfo';
import { applyFiltersFunc } from '../helpers/applyFiltersFunc';

const getSortInfo = (state: RootState): SortInfo => state.refugeesReducer.sortInfo;
const getTableData = (state: RootState): AsyncData<RefugeeData[]> => state.refugeesReducer.refugees;
const getFilterInfo = (state: RootState): FilterInfo[] => state.refugeesReducer.filterInfo;

export const getFilteredRefugees = createSelector([getTableData, getFilterInfo], (tableData, filterInfo) =>
  applyFiltersFunc(tableData, filterInfo)
);

export const getRefugeesDataSorted = createSelector(
  [getFilteredRefugees, getSortInfo],
  ({ state, data }, sortInfo) => ({
    data: data ? sortData(data, sortInfo) : [],
    state,
  })
);
