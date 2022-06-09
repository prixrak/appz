import { DataState } from '@enums/DataState';
import { getErrorInfo } from '@helpers/getErrorInfo';
import { Guard } from '@interfaces/Guard';
import axios from 'axios';
import { put, all, call, takeLatest, takeEvery, select } from 'redux-saga/effects';

import { changeGuardAction, createGuard, getGuards, setGuards, setSelectedElementsAction } from './actions';
import { deleteGuards, fetchGuards, changeGuardHttp, createNewGuard } from './../../../api/guards';
import { displayNotification } from './../../../redux/notifications/actions';

function* getGuardsAsync() {
  try {
    const response: Guard[] = yield call(fetchGuards);
    yield put(setGuards({ data: response, state: DataState.Fulfilled }));
  } catch (error) {
    yield put(
      setGuards({
        data: null,
        state: DataState.Rejected,
        error: axios.isAxiosError(error) ? getErrorInfo(error) : undefined,
      })
    );
  }
}

function* setSelectedElementsActionAsync({ payload: ids }: ReturnType<typeof setSelectedElementsAction>) {
  try {
    yield call(deleteGuards, ids);
    const guards: Guard[] = yield select((state) => state.guardsReducer.guards.data);
    const setGuardsAction = setGuards({
      data: guards.filter((guard) => !ids.includes(guard.id)),
      state: DataState.Fulfilled,
    });
    yield put(setGuardsAction);
    yield put(displayNotification('Guards succseefully deleted'));
  } catch {
    yield put(displayNotification('Failed to delete guards 🥺'));
  }
}

function* changeGuardActionAsync({ payload: changedGuard }: ReturnType<typeof changeGuardAction>) {
  try {
    yield call(changeGuardHttp, changedGuard);
    const guards: Guard[] = yield select((state) => state.guardsReducer.guards.data);
    const setGuardsAction = setGuards({
      data: guards.map((guard) => (guard.id === changedGuard.id ? changedGuard : guard)),
      state: DataState.Fulfilled,
    });
    yield put(setGuardsAction);
    yield put(displayNotification(`Guard ${changedGuard.name ? changedGuard.name : ''} succseefully changed`));
  } catch (error) {
    yield put(displayNotification('Failed to change guard 🥺'));
  }
}

function* createGuardAsync() {
  try {
    yield call(createNewGuard);
    const response: Guard[] = yield call(fetchGuards);
    yield put(setGuards({ data: response, state: DataState.Fulfilled }));
    yield put(displayNotification('Guard succseefully added'));
  } catch (error) {
    yield put(displayNotification('Failed to add guard 🥺'));
  }
}

function* watchGetGuards() {
  yield takeLatest(getGuards.type, getGuardsAsync);
  yield takeEvery(changeGuardAction.type, changeGuardActionAsync);
  yield takeEvery(createGuard.type, createGuardAsync);
}

function* watchStartCheckedEvals() {
  yield takeEvery(setSelectedElementsAction.type, setSelectedElementsActionAsync);
}

export function* guardsSaga(): Generator {
  yield all([watchGetGuards(), watchStartCheckedEvals()]);
}
