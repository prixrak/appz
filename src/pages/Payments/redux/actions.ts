import { AsyncData } from '@interfaces/AsyncData';
import { BonusesToContract } from '@interfaces/BonusesToContract';
import { PaymentForm } from '@interfaces/PaymentForm';
import { PaymentsData } from '@interfaces/PaymentsData';
import { createAction } from '@reduxjs/toolkit';

export const setPayments = createAction<AsyncData<PaymentsData[]>>('payments/setPayments');
export const getPayments = createAction<void>('payments/getPayments');
export const setSelectedElementsAction = createAction<number[]>('payments/setSelectedElementsAction');
export const changePaymentsAction = createAction<PaymentsData>('payments/changePaymentsAction');
export const makePayment = createAction<PaymentForm>('payments/makePayment');
export const getAllBonuses = createAction<void>('payments/getAllBonuses');
export const addBonusesToContract = createAction<BonusesToContract>('payments/addBonusesToContract');
