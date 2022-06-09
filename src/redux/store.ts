import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import userReducers from './user/reducers';
import guardsReducers from '../pages/Guards/redux/reducers';
import notificationsReducers from './notifications/reducers';
import clientContractsReducers from '../pages/ClientContracts/redux/reducers';
import paymentsReducers from '../pages/Payments/redux/reducers';
import guardTeamReducers from '../pages/GuardTeam/redux/reducers';

import { rootSaga } from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    userReducer: userReducers,
    notificationsReducer: notificationsReducers,
    guardsReducer: guardsReducers,
    clientContractsReducer: clientContractsReducers,
    paymentsReducer: paymentsReducers,
    guardTeamReducer: guardTeamReducers,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export default store;
