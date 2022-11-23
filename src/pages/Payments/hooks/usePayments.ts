import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PaymentsData } from '@interfaces/PaymentsData';
import { AsyncData } from '@interfaces/AsyncData';
import { RootState } from '../../../redux/store';
import { getAllBonuses, getPayments } from '../redux/actions';
import { Bonus } from '@interfaces/Bonus';

export const usePayments = (): {
  guards: AsyncData<PaymentsData[]>;
  allBonuses: AsyncData<Bonus[]>;
} => {
  const guards = useSelector<RootState, AsyncData<PaymentsData[]>>((state) => state.paymentsReducer.payments);
  const allBonuses = useSelector<RootState, AsyncData<Bonus[]>>((state) => state.paymentsReducer.allBonuses);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBonuses());
    dispatch(getPayments());
  }, []);

  return {
    guards,
    allBonuses,
  };
};
