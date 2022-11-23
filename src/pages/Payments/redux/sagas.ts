import { DataState } from '@enums/DataState';
import { getErrorInfo } from '@helpers/getErrorInfo';
import { Bonus } from '@interfaces/Bonus';
import { PaymentsData } from '@interfaces/PaymentsData';
import axios from 'axios';
import { uniqueId } from 'lodash';
import { put, all, call, takeLatest, takeEvery, select } from 'redux-saga/effects';
import {
  deletePayments,
  fetchPayments,
  changePaymentsHttp,
  makePaymentHttp,
  fetchBonuses,
  addBonusesApi,
} from '../../../api/payments';
import { displayNotification } from '../../../redux/notifications/actions';
import {
  addBonusesToContract,
  changePaymentsAction,
  getAllBonuses,
  getPayments,
  makePayment,
  setPayments,
  setSelectedElementsAction,
} from './actions';
import { setAllBonuses } from './reducers';

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

function* getAllBonusesAsync() {
  try {
    const response: Bonus[] = yield call(fetchBonuses);
    yield put(setAllBonuses({ data: response, state: DataState.Fulfilled }));
  } catch (error) {
    yield put(
      setAllBonuses({
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
    const payments: PaymentsData[] = yield select((state) => state.paymentsReducer.payments.data);
    const newPayments = payments.map((paymentInner) =>
      payment.contracId === paymentInner.id
        ? {
            ...paymentInner,
            payments: [
              ...paymentInner.payments,
              {
                totalBonus: payment.totalBonus,
                totalSalary: payment.totalSalary,
                startDate: payment.startDate,
                endDate: payment.endDate,
                contracId: payment.contracId,
                id: +uniqueId(),
                transactionDate: new Date().toISOString().slice(0, 10),
              },
            ],
          }
        : paymentInner
    );
    const setPaymentsAction = setPayments({
      data: newPayments,
      state: DataState.Fulfilled,
    });
    yield put(setPaymentsAction);
    yield put(displayNotification('Payment succseefully made'));
  } catch (error) {
    yield put(displayNotification('Failed to make payment 🥺'));
  }
}
function* addBonusesToContractAsync({ payload: bonusesToContract }: ReturnType<typeof addBonusesToContract>) {
  try {
    yield call(addBonusesApi, bonusesToContract);
    yield put(displayNotification('Services succseefully changed'));
  } catch (error) {
    yield put(displayNotification('Failed to change Services 🥺'));
  }
}
function* watchGetGuards() {
  yield takeLatest(getPayments.type, getPaymentsAsync);
  yield takeLatest(getAllBonuses.type, getAllBonusesAsync);
  yield takeLatest(makePayment.type, makePaymentAsync);
  yield takeEvery(addBonusesToContract.type, addBonusesToContractAsync);
  yield takeEvery(changePaymentsAction.type, changePaymentsActionAsync);
}

function* watchStartCheckedEvals() {
  yield takeEvery(setSelectedElementsAction.type, setSelectedElementsActionAsync);
}

export function* paymentsSaga(): Generator {
  yield all([watchGetGuards(), watchStartCheckedEvals()]);
}
