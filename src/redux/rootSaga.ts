import { all, call, spawn } from 'redux-saga/effects';
import { userSaga } from './user/sagas';
import { notificationsSaga } from './notifications/sagas';
import { guardsSaga } from '@pages/Guards/redux/sagas';
import { clientContractsSaga } from '@pages/ClientContracts/redux/sagas';
import { paymentsSaga } from '@pages/Payments/redux/sagas';
import { guardTeamSaga } from '@pages/GuardTeam/redux/sagas';

export function* rootSaga(): Generator {
  const sagas = [userSaga, notificationsSaga, guardsSaga, clientContractsSaga, paymentsSaga, guardTeamSaga];

  yield all(
    sagas.map((saga) =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            if (e instanceof Error) {
              // eslint-disable-next-line no-console
              console.log('saga', e.message);
            }
          }
        }
      })
    )
  );
}
