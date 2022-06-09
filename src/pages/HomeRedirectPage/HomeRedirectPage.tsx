import { DataState } from '@enums/DataState';
import { Paths } from '@enums/Path';
import { Role } from '@enums/Role';
import React, { FC, memo } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const HomeRedirectPageComponent: FC = () => {
  const currentUser = useAuth();
  const rootRedirectPath = !currentUser.data
    ? Paths.login
    : currentUser.data.role === Role.Accountant
    ? Paths.payments
    : currentUser.data.role === Role.Guard
    ? Paths.guardTeam
    : Paths.guards;

  return currentUser.state !== DataState.Pending && rootRedirectPath ? (
    <Navigate to={rootRedirectPath} />
  ) : (
    <h3>You will be redirected to your home page shortly...</h3>
  );
};

export const HomeRedirectPage = memo(HomeRedirectPageComponent);
