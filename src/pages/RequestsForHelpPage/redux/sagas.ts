import { DataState } from '@enums/DataState';
import { getErrorInfo } from '@helpers/getErrorInfo';
import { RequestForHelpData } from '@interfaces/RequestForHelpData';
import { fetchRequestsForHelp } from '../../../api/requestsForHelp';
import axios from 'axios';
import { put, all, takeLatest, call } from 'redux-saga/effects';
import { getRequestsForHelp } from './actions';
import { setRequestsForHelp } from './reducers';

function* getRequestsForHelpAsync() {
  try {
    const response: RequestForHelpData[] = yield call(fetchRequestsForHelp);
    // const response: RequestForHelpData[] | null = requestForHelpMockData.data;
    yield put(setRequestsForHelp({ data: response, state: DataState.Fulfilled }));
  } catch (error) {
    yield put(
      setRequestsForHelp({
        data: null,
        state: DataState.Rejected,
        error: axios.isAxiosError(error) ? getErrorInfo(error) : undefined,
      })
    );
  }
}

function* watchGetRequestsForHelp() {
  yield takeLatest(getRequestsForHelp.type, getRequestsForHelpAsync);
}

export function* requestsForHelpSaga(): Generator {
  yield all([watchGetRequestsForHelp()]);
}
