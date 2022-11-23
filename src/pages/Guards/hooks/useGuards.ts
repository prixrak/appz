import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Guard } from '@interfaces/Guard';
import { AsyncData } from '@interfaces/AsyncData';
import { RootState } from '../../../redux/store';
import { getAddresses, getGuards } from '../redux/actions';
import { AddressesData } from '@interfaces/AddressesData';

export const useGuards = (): {
  guards: AsyncData<Guard[]>;
  addresses: AsyncData<AddressesData>;
} => {
  const guards = useSelector<RootState, AsyncData<Guard[]>>((state) => state.guardsReducer.guards);
  const addresses = useSelector<RootState, AsyncData<AddressesData>>((state) => state.guardsReducer.addresses);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGuards());
    dispatch(getAddresses());
  }, []);

  return {
    guards,
    addresses,
  };
};
