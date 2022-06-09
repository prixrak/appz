import React, { FC, memo, ReactNode, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';

import { useStyles } from './SidebarLink.styles';
import { User } from '@interfaces/User';
import { Role } from '@enums/Role';

interface Props {
  children: ReactNode;
  to: string;
  currentUser: User;
  otherRoutes?: string[];
  roles?: Role[];
  adminRoute?: boolean;
  isShown?: boolean;
}

const SidebarLinkComponent: FC<Props> = ({ children, to, otherRoutes, isShown = true }) => {
  const styles = useStyles();
  const location = useLocation();
  const [isItemActive, setIsItemActive] = useState(false);

  useEffect(() => {
    setIsItemActive(
      !!location.pathname.includes(to) ||
        !!otherRoutes?.some((r) => location.pathname.includes(r)) ||
        !!to.startsWith(location.pathname)
    );
  }, [location]);

  return isShown ? (
    <Link to={to} className={classNames(styles.navItem, { [styles.activeNavItem]: isItemActive })}>
      {children}
    </Link>
  ) : (
    <></>
  );
};

export const SidebarLink = memo(SidebarLinkComponent);
