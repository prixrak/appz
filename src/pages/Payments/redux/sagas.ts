import { DataState } from '@enums/DataState';
import { getErrorInfo } from '@helpers/getErrorInfo';
import { PaymentsData } from '@interfaces/PaymentsData';
import axios from 'axios';
import { put, all, call, takeLatest, takeEvery, select } from 'redux-saga/effects';
import { deletePayments, fetchPayments, changePaymentsHttp, makePaymentHttp } from '../../../api/payments';
import { displayNotification } from '../../../redux/notifications/actions';
import { changePaymentsAction, getPayments, makePayment, setPayments, setSelectedElementsAction } from './actions';

function* getPaymentsAsync() {
  try {
    const response: PaymentsData[] = yield call(fetchPayments);
    yield put(setPayments({ data: response, state: DataState.Fulfilled }));
  } catch (error) {
    yield put(
      setPayments({
        data: null,
        state: DataState.Rejected,
        error: axios.isAxiosError(error) ? getErrorInfo(error) : undefined,
      })
    );
  }
}

function* setSelectedElementsActionAsync({ payload: ids }: ReturnType<typeof setSelectedElementsAction>) {
  try {
    yield call(deletePayments, ids);
    const payments: PaymentsData[] = yield select((state) => state.paymentsReducer.payments.data);
    const setGuardsAction = setPayments({
      data: payments.filter((payments) => !ids.includes(payments.id)),
      state: DataState.Fulfilled,
    });
    yield put(setGuardsAction);
    yield put(displayNotification('Guards succseefully deleted'));
  } catch {
    yield put(displayNotification('Failed to delete payments 🥺'));
  }
}

function* changePaymentsActionAsync({ payload: changedGuard }: ReturnType<typeof changePaymentsAction>) {
  try {
    yield call(changePaymentsHttp, changedGuard);
    const payments: PaymentsData[] = yield select((state) => state.paymentsReducer.payments.data);
    const setGuardsAction = setPayments({
      data: payments.map((payments) => (payments.id === changedGuard.id ? changedGuard : payments)),
      state: DataState.Fulfilled,
    });
    yield put(setGuardsAction);
  } catch (error) {
    yield put(
      setPayments({
        data: null,
        state: DataState.Rejected,
        error: axios.isAxiosError(error) ? getErrorInfo(error) : undefined,
      })
    );
  }
}

function* makePaymentAsync({ payload: payment }: ReturnType<typeof makePayment>) {
  try {
    yield call(makePaymentHttp, payment);
    yield put(displayNotification('Payment succseefully made'));
  } catch (error) {
    yield put(displayNotification('Failed to make payment 🥺'));
  }
}

function* watchGetGuards() {
  yield takeLatest(getPayments.type, getPaymentsAsync);
  yield takeLatest(makePayment.type, makePaymentAsync);
  yield takeEvery(changePaymentsAction.type, changePaymentsActionAsync);
}

function* watchStartCheckedEvals() {
  yield takeEvery(setSelectedElementsAction.type, setSelectedElementsActionAsync);
}

export function* paymentsSaga(): Generator {
  yield all([watchGetGuards(), watchStartCheckedEvals()]);
}
