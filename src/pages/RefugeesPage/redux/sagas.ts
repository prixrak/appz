import { DataState } from '@enums/DataState';
import { getErrorInfo } from '@helpers/getErrorInfo';
import { RefugeeData } from '@interfaces/RefugeeData';
import { fetchRefugees } from '../../../api/refugees';
import axios from 'axios';
import { put, all, takeLatest, call } from 'redux-saga/effects';
import { getRefugees } from './actions';
import { setRefugees } from './reducers';

function* getRefugeesAsync() {
  try {
    const response: RefugeeData[] = yield call(fetchRefugees);
    // console.log(response);
    // const response: RefugeeData[] | null = refugeesMockData.data;
    yield put(setRefugees({ data: response, state: DataState.Fulfilled }));
  } catch (error) {
    yield put(
      setRefugees({
        data: null,
        state: DataState.Rejected,
        error: axios.isAxiosError(error) ? getErrorInfo(error) : undefined,
      })
    );
  }
}

function* watchGetRefugees() {
  yield takeLatest(getRefugees.type, getRefugeesAsync);
}

export function* refugeesSaga(): Generator {
  yield all([watchGetRefugees()]);
}
