import { DataState } from '@enums/DataState';
import { createSlice } from '@reduxjs/toolkit';
import { State } from './types';

const initialState: State = {
  payments: { data: null, state: DataState.Pending },
};

export const slice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    setPayments(state, action) {
      state.payments = action.payload;
    },
  },
});

export default slice.reducer;
