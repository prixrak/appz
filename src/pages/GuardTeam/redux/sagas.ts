import { DataState } from '@enums/DataState';
import { getErrorInfo } from '@helpers/getErrorInfo';
import { GuardTeamData } from '@interfaces/GuardTeamData';
import axios from 'axios';
import { put, all, call, takeLatest } from 'redux-saga/effects';
import { fetchGuardTeam } from '../../../api/guardTeam';
import { getGuardTeam, setGuardTeam } from './actions';

function* getGuardTeamAsync() {
  try {
    const response: GuardTeamData[] = yield call(fetchGuardTeam);
    yield put(setGuardTeam({ data: response, state: DataState.Fulfilled }));
  } catch (error) {
    yield put(
      setGuardTeam({
        data: null,
        state: DataState.Rejected,
        error: axios.isAxiosError(error) ? getErrorInfo(error) : undefined,
      })
    );
  }
}

function* watchGetGuards() {
  yield takeLatest(getGuardTeam.type, getGuardTeamAsync);
}

export function* guardTeamSaga(): Generator {
  yield all([watchGetGuards()]);
}
