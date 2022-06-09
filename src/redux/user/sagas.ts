import axios from 'axios';
import { put, all, call, takeLeading, takeLatest } from 'redux-saga/effects';
import { checkUserValidHttp, fetchCurrentUser, loginUserHttp, registrationUser } from '../../api/user';
import { DataState } from '../../enums/DataState';
import { getErrorInfo } from '../../helpers/getErrorInfo';
import { User } from '../../interfaces/User';
import { checkUserValid, getCurrentUser, loginUser, registerUser, setCurrentUser } from './actions';
import { displayNotification } from './../notifications/actions';

function* getCurrentUserAsync() {
  try {
    const response: { data: User } = yield call(fetchCurrentUser);
    yield put(setCurrentUser({ data: response.data, state: DataState.Fulfilled }));
  } catch (error) {
    yield put(
      setCurrentUser({
        data: null,
        state: DataState.Rejected,
        error: axios.isAxiosError(error) ? getErrorInfo(error) : undefined,
      })
    );
  }
}

function* registerUserAsync({ payload: user }: ReturnType<typeof registerUser>) {
  try {
    const response: User = yield call(registrationUser, user);
    yield put(setCurrentUser({ data: response, state: DataState.Fulfilled }));
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(displayNotification(getErrorInfo(error).message));

    yield put(
      setCurrentUser({
        data: null,
        state: DataState.Rejected,
        error: axios.isAxiosError(error) ? getErrorInfo(error) : undefined,
      })
    );
  }
}

function* loginUserAsync({ payload: user }: ReturnType<typeof loginUser>) {
  try {
    const response: User = yield call(loginUserHttp, user);
    yield put(setCurrentUser({ data: response, state: DataState.Fulfilled }));
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(displayNotification(getErrorInfo(error).message));
    yield put(
      setCurrentUser({
        data: null,
        state: DataState.Fulfilled,
        error: axios.isAxiosError(error) ? getErrorInfo(error) : undefined,
      })
    );
  }
}

function* checkUserValidAsync() {
  try {
    setCurrentUser({ data: null, state: DataState.Pending });
    const response: User = yield call(checkUserValidHttp);
    yield put(setCurrentUser({ data: response, state: DataState.Fulfilled }));
  } catch (error) {
    yield put(
      setCurrentUser({
        data: null,
        state: DataState.Fulfilled,
      })
    );
  }
}

function* watchGetCurrentUser() {
  yield takeLeading(getCurrentUser.type, getCurrentUserAsync);
  yield takeLatest(registerUser.type, registerUserAsync);
  yield takeLatest(loginUser.type, loginUserAsync);
  yield takeLeading(checkUserValid.type, checkUserValidAsync);
}

export function* userSaga(): Generator {
  yield all([watchGetCurrentUser()]);
}
