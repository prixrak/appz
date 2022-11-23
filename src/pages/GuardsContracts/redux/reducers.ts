import { DataState } from '@enums/DataState';
import { createSlice } from '@reduxjs/toolkit';
import { State } from './types';

const initialState: State = {
  guardsContracts: { data: null, state: DataState.Pending },
  allGuards: { data: null, state: DataState.Pending },
};

export const slice = createSlice({
  name: 'guardsContracts',
  initialState,
  reducers: {
    setGuardsContracts(state, action) {
      state.guardsContracts = action.payload;
    },
    setGuards(state, action) {
      state.allGuards = action.payload;
    },
  },
});
export const { setGuards } = slice.actions;

export default slice.reducer;
