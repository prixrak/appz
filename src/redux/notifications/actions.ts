import { createAction } from '@reduxjs/toolkit';

export const displayNotification = createAction<string>('notifications/displayNotification');
