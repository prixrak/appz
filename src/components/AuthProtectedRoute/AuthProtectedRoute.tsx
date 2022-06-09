import { FC, useState } from 'react';
import { useEffect, memo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Role } from '../../enums/Role';
import { DefaultLayout } from './../DefaultLayout/DefaultLayout';
import { DataState } from '@enums/DataState';

interface Props {
  allowedRoles?: Role[];
}
const AuthProtectedRouteComponent: FC<Props> = ({ allowedRoles }) => {
  const location = useLocation();
  const currentUser = useAuth();
  const [isAllowed, setIsAllowed] = useState<boolean>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    !allowedRoles || (currentUser && currentUser.data && allowedRoles.includes(currentUser.data.role))
      ? setIsAllowed(true)
      : setIsAllowed(false);
  }, [currentUser, allowedRoles]);

  return currentUser.state === DataState.Pending ? (
    <div>fetching user </div>
  ) : currentUser.state === DataState.Rejected ? (
    <div>fetch user error </div>
  ) : (
    <DefaultLayout currentUser={currentUser.data}>
      {!isAllowed ? <div>no access</div> : <Outlet></Outlet>}
    </DefaultLayout>
  );
};

export const AuthProtectedRoute = memo(AuthProtectedRouteComponent);
