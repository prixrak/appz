import React, { FC, memo } from 'react';
import { useStyles } from './SidebarContentItems.styles';
import { User as UserIcon } from 'react-iconly';
import { SidebarLink } from '../SidebarLink';
import { User } from '@interfaces/User';
import { Paths } from '@enums/Path';
import { Role } from '@enums/Role';

interface Props {
  currentUser: User;
}

const SidebarContentItemsComponent: FC<Props> = ({ currentUser }) => {
  const styles = useStyles();

  return (
    <>
      <SidebarLink to={`${Paths.clientContracts}`} currentUser={currentUser} isShown={currentUser.role === Role.Admin}>
        <UserIcon />
        <span className={styles.navText}>Clients Contracts</span>
      </SidebarLink>
      <SidebarLink to={`${Paths.guards}`} currentUser={currentUser} isShown={currentUser.role === Role.Admin}>
        <UserIcon />
        <span className={styles.navText}>Guards</span>
      </SidebarLink>
      <SidebarLink to={`${Paths.payments}`} currentUser={currentUser} isShown={currentUser.role === Role.Accountant}>
        <UserIcon />
        <span className={styles.navText}>Payments</span>
      </SidebarLink>
      <SidebarLink to={`${Paths.guardTeam}`} currentUser={currentUser} isShown={currentUser.role === Role.Guard}>
        <UserIcon />
        <span className={styles.navText}>My team</span>
      </SidebarLink>
      <SidebarLink to={`${Paths.guardsContracts}`} currentUser={currentUser} isShown={currentUser.role === Role.Admin}>
        <UserIcon />
        <span className={styles.navText}>Guards Contracts</span>
      </SidebarLink>
    </>
  );
};

export const SidebarContentItems = memo(SidebarContentItemsComponent);
