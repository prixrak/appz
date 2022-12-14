import { DataState } from '@enums/DataState';
import { createSlice } from '@reduxjs/toolkit';
import { State } from './types';

const initialState: State = {
  guards: { data: null, state: DataState.Pending },
  addresses: { data: null, state: DataState.Pending },
};

export const slice = createSlice({
  name: 'guards',
  initialState,
  reducers: {
    setGuards(state, action) {
      state.guards = action.payload;
    },
    setAddresses(state, action) {
      state.addresses = action.payload;
    },
  },
});

export const { setGuards, setAddresses } = slice.actions;
export default slice.reducer;
