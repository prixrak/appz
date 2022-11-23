import React, { FC, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProtectedRoute } from '../components/AuthProtectedRoute/AuthProtectedRoute';
import ClientContracts from '../pages/ClientContracts/ClientContracts';
import Auth from '../pages/Auth/Auth';
import { Role } from '../enums/Role';
import { HomeRedirectPage } from '../pages/HomeRedirectPage';
import { Paths } from '../enums/Path';
import GuardTeam from '@pages/GuardTeam/GuardTeam';
import Guards from '@pages/Guards/Guards';
import { useDispatch } from 'react-redux';
import { checkUserValid } from './../redux/user/actions';
import Payments from '@pages/Payments/Payments';
import GuardsContracts from '@pages/GuardsContracts/GuardsContracts';

const AppRouter: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserValid());
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path={Paths.root} element={<HomeRedirectPage />} />
        <Route element={<AuthProtectedRoute />}>
          <Route path={Paths.login} element={<Auth />} />
          <Route path={Paths.register} element={<Auth />} />
        </Route>
        <Route element={<AuthProtectedRoute allowedRoles={[Role.Admin]} />}>
          <Route path={Paths.clientContracts} element={<ClientContracts />} />
        </Route>
        <Route element={<AuthProtectedRoute allowedRoles={[Role.Guard]} />}>
          <Route path={Paths.guardTeam} element={<GuardTeam />} />
        </Route>
        <Route element={<AuthProtectedRoute allowedRoles={[Role.Admin, Role.Accountant]} />}>
          <Route path={Paths.guards} element={<Guards />} />
        </Route>
        <Route element={<AuthProtectedRoute allowedRoles={[Role.Accountant]} />}>
          <Route path={Paths.payments} element={<Payments />} />
        </Route>
        <Route element={<AuthProtectedRoute allowedRoles={[Role.Admin]} />}>
          <Route path={Paths.guardsContracts} element={<GuardsContracts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
