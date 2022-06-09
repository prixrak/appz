import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAuthToken } from '../helpers/auth';
import { User } from '../interfaces/User';
import { RootState } from '../redux/store';
import { AsyncData } from '@interfaces/AsyncData';
import { useLocation, useNavigate } from 'react-router-dom';
import { Paths } from '@enums/Path';
import { DataState } from '@enums/DataState';

export const useAuth = (): AsyncData<User> => {
  const currentUser = useSelector<RootState, AsyncData<User>>((state) => state.userReducer.currentUser);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const authToken = getAuthToken();
    if (
      currentUser.state !== DataState.Pending &&
      (!authToken || !currentUser.data) &&
      location.pathname !== Paths.login &&
      location.pathname !== Paths.register
    ) {
      navigate(Paths.login);
      return;
    }
  }, [currentUser, location.pathname]);

  return currentUser;
};
