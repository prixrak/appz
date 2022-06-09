import { DataState } from '@enums/DataState';
import { createSlice } from '@reduxjs/toolkit';
import { State } from './types';

const initialState: State = {
  guardTeam: { data: null, state: DataState.Pending },
};

export const slice = createSlice({
  name: 'guardTeam',
  initialState,
  reducers: {
    setGuardTeam(state, action) {
      state.guardTeam = action.payload;
    },
  },
});

export default slice.reducer;
