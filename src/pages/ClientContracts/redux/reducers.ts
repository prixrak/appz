import { DataState } from '@enums/DataState';
import { createSlice } from '@reduxjs/toolkit';
import { State } from './types';

const initialState: State = {
  clientContracts: { data: null, state: DataState.Pending },
};

export const slice = createSlice({
  name: 'clientContracts',
  initialState,
  reducers: {
    setClientContracts(state, action) {
      state.clientContracts = action.payload;
    },
  },
});

export default slice.reducer;
