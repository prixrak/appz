import { AsyncData } from '@interfaces/AsyncData';
import { RefugeeData } from '@interfaces/RefugeeData';
import { SortInfo } from '@interfaces/SortInfo';
import { createSelector } from '@reduxjs/toolkit';
import { sortData } from '../../../redux/helpers/sortData';
import { RootState } from 'redux/store';

const getSortInfo = (state: RootState): SortInfo => state.refugeesReducer.sortInfo;
const getTableData = (state: RootState): AsyncData<RefugeeData[]> => state.refugeesReducer.refugees;

export const getRefugeesDataSorted = createSelector([getTableData, getSortInfo], ({ state, data }, sortInfo) => ({
  data: data ? sortData(data, sortInfo) : [],
  state,
}));
