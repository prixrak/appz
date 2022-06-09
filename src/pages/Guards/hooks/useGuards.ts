import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Guard } from '@interfaces/Guard';
import { AsyncData } from '@interfaces/AsyncData';
import { RootState } from '../../../redux/store';
import { getGuards } from '../redux/actions';

export const useGuards = (): AsyncData<Guard[]> => {
  const guards = useSelector<RootState, AsyncData<Guard[]>>((state) => state.guardsReducer.guards);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGuards());
  }, []);

  return guards;
};
