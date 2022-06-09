import { createSlice } from '@reduxjs/toolkit';
import { DataState } from '../../enums/DataState';
import { State } from './types';

const initialState: State = {
  currentUser: { data: null, state: DataState.Pending },
};

export const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
  },
});

export default slice.reducer;
