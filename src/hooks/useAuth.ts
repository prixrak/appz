import { useEffect } from 'react';
import { getAuthToken } from '../helpers/auth';
import { User } from '../interfaces/User';
import { AsyncData } from '@interfaces/AsyncData';
import { useLocation, useNavigate } from 'react-router-dom';
import { Paths } from '@enums/Path';
import { DataState } from '@enums/DataState';
import { Role } from '@enums/Role';

export const useAuth = (): AsyncData<User> => {
  // const currentUser = useSelector<RootState, AsyncData<User>>((state) => state.userReducer.currentUser);
  const currentUser = {
    state: DataState.Fulfilled,
    data: {
      name: 'Arman Petrosian',
      role: Role.Worker,
    },
  };

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
