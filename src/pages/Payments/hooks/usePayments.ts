import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PaymentsData } from '@interfaces/PaymentsData';
import { AsyncData } from '@interfaces/AsyncData';
import { RootState } from '../../../redux/store';
import { getPayments } from '../redux/actions';

export const usePayments = (): AsyncData<PaymentsData[]> => {
  const payments = useSelector<RootState, AsyncData<PaymentsData[]>>((state) => state.paymentsReducer.payments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPayments());
  }, []);

  return payments;
};
