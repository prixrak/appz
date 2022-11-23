import { DataState } from '@enums/DataState';
import { getErrorInfo } from '@helpers/getErrorInfo';
import { ClientContractsData } from '@interfaces/ClientContractsData';
import { changeClientHttp } from './../../../api/client';
import axios from 'axios';
import { put, all, call, takeLatest, takeEvery, select } from 'redux-saga/effects';
import {
  deleteClientContracts,
  fetchClientContracts,
  changeClientContractsHttp,
  createNewClientContracts,
  addServices,
} from './../../../api/clientContracts';
import { displayNotification } from './../../../redux/notifications/actions';
import {
  addServicesAction,
  changeClientAction,
  changeClientContractsAction,
  createClientContract,
  getClientContracts,
  setClientContracts,
  setSelectedElementsAction,
} from './actions';

function* getClientContractsAsync() {
  try {
    const response: ClientContractsData[] = yield call(fetchClientContracts);
    yield put(setClientContracts({ data: response, state: DataState.Fulfilled }));
  } catch (error) {
    yield put(
      setClientContracts({
        data: null,
        state: DataState.Rejected,
        error: axios.isAxiosError(error) ? getErrorInfo(error) : undefined,
      })
    );
  }
}

function* setSelectedElementsActionAsync({ payload: ids }: ReturnType<typeof setSelectedElementsAction>) {
  try {
    yield call(deleteClientContracts, ids);
    const clientContracts: ClientContractsData[] = yield select(
      (state) => state.clientContractsReducer.clientContracts.data
    );
    const setClientContractsAction = setClientContracts({
      data: clientContracts.filter((clientContracts) => !ids.includes(clientContracts.id)),
      state: DataState.Fulfilled,
    });
    yield put(setClientContractsAction);
    yield put(displayNotification('Contracts succseefully deleted'));
  } catch {
    yield put(displayNotification('Failed to delete contracts 🥺'));
  }
}

function* changeClientContractsActionAsync({
  payload: changedContract,
}: ReturnType<typeof changeClientContractsAction>) {
  try {
    yield call(changeClientContractsHttp, changedContract);
    const clientContracts: ClientContractsData[] = yield select(
      (state) => state.clientContractsReducer.clientContracts.data
    );
    const setClientContractsAction = setClientContracts({
      data: clientContracts.map((clientContracts) =>
        clientContracts.id === changedContract.id ? changedContract : clientContracts
      ),
      state: DataState.Fulfilled,
    });
    yield put(setClientContractsAction);
    yield put(displayNotification('Contract succseefully changed'));
  } catch (error) {
    yield put(displayNotification('Failed to change contract 🥺'));
  }
}

function* createClientContractAsync() {
  try {
    yield call(createNewClientContracts);
    const response: ClientContractsData[] = yield call(fetchClientContracts);
    yield put(setClientContracts({ data: response, state: DataState.Fulfilled }));
    yield put(displayNotification('New contract succseefully created'));
  } catch (error) {
    yield put(displayNotification('Failed to create contract 🥺'));
  }
}

function* changeClientActionAsync({ payload: changedClient }: ReturnType<typeof changeClientAction>) {
  try {
    yield call(changeClientHttp, changedClient);
    const clientContracts: ClientContractsData[] = yield select(
      (state) => state.clientContractsReducer.clientContracts.data
    );
    const setClientContractsAction = setClientContracts({
      data: clientContracts.map((clientContracts) =>
        clientContracts?.client?.id === changedClient.id
          ? { ...clientContracts, client: changedClient }
          : clientContracts
      ),
      state: DataState.Fulfilled,
    });
    yield put(setClientContractsAction);
    yield put(displayNotification(`Client ${changedClient.name ? changedClient.name : ''} succseefully changed`));
  } catch (error) {
    yield put(displayNotification('Failed to change client 🥺'));
  }
}

function* addServicesActionAsync({ payload: servicesToContract }: ReturnType<typeof addServicesAction>) {
  try {
    yield call(addServices, servicesToContract);
    yield put(displayNotification('Services succseefully changed'));
  } catch (error) {
    yield put(displayNotification('Failed to change Services 🥺'));
  }
}

function* watchGetClientContracts() {
  yield takeLatest(getClientContracts.type, getClientContractsAsync);

  yield takeEvery(changeClientContractsAction.type, changeClientContractsActionAsync);
  yield takeEvery(createClientContract.type, createClientContractAsync);
  yield takeEvery(addServicesAction.type, addServicesActionAsync);

  yield takeEvery(changeClientAction.type, changeClientActionAsync);
}

function* watchStartCheckedEvals() {
  yield takeEvery(setSelectedElementsAction.type, setSelectedElementsActionAsync);
}

export function* clientContractsSaga(): Generator {
  yield all([watchGetClientContracts(), watchStartCheckedEvals()]);
}
