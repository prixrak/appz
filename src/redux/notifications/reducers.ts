import { createSlice, nanoid } from '@reduxjs/toolkit';

import { State } from './types';

const initialState: State = {
  notifications: [],
};

export const slice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    queueNotification(state, { payload }: { payload: string }) {
      state.notifications = [
        ...state.notifications,
        {
          message: payload,
          id: nanoid(),
        },
      ];
    },
    dequeueNotification(state) {
      state.notifications.shift();
    },
  },
});

export const { queueNotification, dequeueNotification } = slice.actions;

export default slice.reducer;
