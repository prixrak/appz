import { all, delay, put, takeEvery } from 'redux-saga/effects';
import { displayNotification } from './actions';
import { dequeueNotification, queueNotification } from './reducers';

const NOTIFICATION_HIDE_DELAY_MS = 4000;

function* displayNotificationAsync({ payload }: ReturnType<typeof displayNotification>) {
  yield put(queueNotification(payload));
  yield delay(NOTIFICATION_HIDE_DELAY_MS);
  yield put(dequeueNotification());
}

function* watchDisplayNotification() {
  yield takeEvery(displayNotification.type, displayNotificationAsync);
}

export function* notificationsSaga(): Generator {
  yield all([watchDisplayNotification()]);
}
