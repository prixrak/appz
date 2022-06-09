import { createAction } from '@reduxjs/toolkit';
import { AsyncData } from '../../interfaces/AsyncData';
import { User } from '../../interfaces/User';

export const setCurrentUser = createAction<AsyncData<User>>('user/setCurrentUser');
export const getCurrentUser = createAction<void>('user/getCurrentUser');
export const registerUser = createAction<User>('user/registerUser');
export const loginUser = createAction<User>('user/loginUser');
export const checkUserValid = createAction<void>('user/checkUserValid');
