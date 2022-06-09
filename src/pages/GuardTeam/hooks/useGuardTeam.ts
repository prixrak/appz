import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GuardTeamData } from '@interfaces/GuardTeamData';
import { AsyncData } from '@interfaces/AsyncData';
import { RootState } from '../../../redux/store';
import { getGuardTeam } from '../redux/actions';

export const useGuardTeam = (): AsyncData<GuardTeamData[]> => {
  const guardTeam = useSelector<RootState, AsyncData<GuardTeamData[]>>((state) => state.guardTeamReducer.guardTeam);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGuardTeam());
  }, []);

  return guardTeam;
};
