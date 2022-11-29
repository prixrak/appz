import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RequestForHelpData } from '@interfaces/RequestForHelpData';
import { AsyncData } from '@interfaces/AsyncData';
import { RootState } from '../../../redux/store';
import { getRequestsForHelp } from '../redux/actions';
import { getRequestsForHelpDataSorted } from '../redux/selectors';

export const useRequestsForHelpPageData = (): AsyncData<RequestForHelpData[]> => {
  const requestForHelp = useSelector<RootState, AsyncData<RequestForHelpData[]>>(getRequestsForHelpDataSorted);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRequestsForHelp());
  }, []);

  return requestForHelp;
};
