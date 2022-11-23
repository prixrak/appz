import { DataState } from '@enums/DataState';
import { getErrorInfo } from '@helpers/getErrorInfo';
import axios from 'axios';
import { put, all, call, takeLatest, takeEvery, select } from 'redux-saga/effects';
import { fetchGuards } from './../../../api/guards';
import {
  changeGuardContractAction,
  createGuardContract,
  getAllGuards,
  getGuardsContracts,
  setGuardsContracts,
  setSelectedElementsAction,
} from './actions';
import {
  changeGuardContractHttp,
  createNewContract,
  deleteGuardsContracts,
  fetchGuardsContracts,
} from './../../../api/guardsContracts';
import { displayNotification } from './../../../redux/notifications/actions';
import { GuardsContractsData } from '@interfaces/GuardSContracts';
import { Guard } from '@interfaces/Guard';
import { setGuards } from './reducers';
import { RootState } from 'redux/store';

function* getGuardsContractsAsync() {
  try {
    const response: GuardsContractsData = yield call(fetchGuardsContracts);
    yield put(setGuardsContracts({ data: response, state: DataState.Fulfilled }));
  } catch (error) {
    yield put(
      setGuardsContracts({
        data: null,
        state: DataState.Rejected,
        error: axios.isAxiosError(error) ? getErrorInfo(error) : undefined,
      })
    );
  }
}

function* setSelectedElementsActionAsync({ payload: ids }: ReturnType<typeof setSelectedElementsAction>) {
  try {
    yield call(deleteGuardsContracts, ids);
    const guardsContracts: GuardsContractsData = yield select(
      (state: RootState) => state.guardsContractsReducer.guardsContracts.data
    );
    const setGuardsContractsAction = setGuardsContracts({
      data: {
        ...guardsContracts,
        contracts: guardsContracts.contracts.filter((guardContracts) => !ids.includes(guardContracts.id)),
      },
      state: DataState.Fulfilled,
    });

    yield put(setGuardsContractsAction);
    yield put(displayNotification('Guards Contracts succseefully deleted'));
  } catch {
    yield put(displayNotification('Failed to delet 🥺'));
  }
}

function* changeGuardContractActionAsync({
  payload: changedGuardContract,
}: ReturnType<typeof changeGuardContractAction>) {
  try {
    yield call(changeGuardContractHttp, changedGuardContract);
    yield put(displayNotification('Guard contract succseefully changed'));
  } catch (error) {
    yield put(displayNotification('Failed to change guardContracts 🥺'));
  }
}

function* createGuardContractAsync({ payload: id }: ReturnType<typeof createGuardContract>) {
  try {
    yield call(createNewContract, id);
    const response: GuardsContractsData = yield call(fetchGuardsContracts);
    yield put(setGuardsContracts({ data: response, state: DataState.Fulfilled }));
    yield put(displayNotification('Guard succseefully added'));
  } catch (error) {
    yield put(displayNotification('Failed to add guard 🥺'));
  }
}

function* getAllGuardsAsync() {
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

function* watchGetGuardsContracts() {
  yield takeLatest(getGuardsContracts.type, getGuardsContractsAsync);
  yield takeLatest(getAllGuards.type, getAllGuardsAsync);
  yield takeEvery(changeGuardContractAction.type, changeGuardContractActionAsync);
  yield takeEvery(createGuardContract.type, createGuardContractAsync);
}

function* watchStartCheckedEvals() {
  yield takeEvery(setSelectedElementsAction.type, setSelectedElementsActionAsync);
}

export function* guardsContractsSaga(): Generator {
  yield all([watchGetGuardsContracts(), watchStartCheckedEvals()]);
}
