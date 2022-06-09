import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClientContractsData } from '@interfaces/ClientContractsData';
import { AsyncData } from '@interfaces/AsyncData';
import { RootState } from '../../../redux/store';
import { getClientContracts } from '../redux/actions';

export const useClientContracts = (): AsyncData<ClientContractsData[]> => {
  const clientContracts = useSelector<RootState, AsyncData<ClientContractsData[]>>(
    (state) => state.clientContractsReducer.clientContracts
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClientContracts());
  }, []);

  return clientContracts;
};
