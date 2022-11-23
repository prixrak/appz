import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AsyncData } from '@interfaces/AsyncData';
import { RootState } from '../../../redux/store';
import { getAllGuards, getGuardsContracts } from '../redux/actions';
import { GuardsContractsData } from '@interfaces/GuardSContracts';
import { Guard } from '@interfaces/Guard';

export const useGuardsContracts = (): {
  guardsContracts: AsyncData<GuardsContractsData>;
  allGuards: AsyncData<Guard[]>;
} => {
  const guardsContracts = useSelector<RootState, AsyncData<GuardsContractsData>>(
    (state) => state.guardsContractsReducer.guardsContracts
  );
  const allGuards = useSelector<RootState, AsyncData<Guard[]>>((state) => state.guardsContractsReducer.allGuards);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGuardsContracts());
    dispatch(getAllGuards());
  }, []);

  return {
    guardsContracts,
    allGuards,
  };
};
