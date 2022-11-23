import { DataState } from '@enums/DataState';
import { SortDirection } from '@enums/sortDirection';
import { createSlice } from '@reduxjs/toolkit';
import { State } from './types';

const initialState: State = {
  refugees: { data: null, state: DataState.Pending },
  sortInfo: { field: 'name', sortDirection: SortDirection.Asc },
  filterInfo: [],
};

export const slice = createSlice({
  name: 'refugees',
  initialState,
  reducers: {
    setRefugees(state, action) {
      state.refugees = action.payload;
    },
    setSortInfo(state, action) {
      state.sortInfo = action.payload;
    },
    setFilterInfo(state, action) {
      state.filterInfo = action.payload;
    },
  },
});

export const { setSortInfo, setRefugees, setFilterInfo } = slice.actions;

export default slice.reducer;
