import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RefugeeData } from '@interfaces/RefugeeData';
import { AsyncData } from '@interfaces/AsyncData';
import { RootState } from '../../../redux/store';
import { getRefugees } from '../redux/actions';
import { getRefugeesDataSorted } from '../redux/selectors';

export const useRefugeesPageData = (): AsyncData<RefugeeData[]> => {
  const refugees = useSelector<RootState, AsyncData<RefugeeData[]>>(getRefugeesDataSorted);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRefugees());
  }, []);

  return refugees;
};
