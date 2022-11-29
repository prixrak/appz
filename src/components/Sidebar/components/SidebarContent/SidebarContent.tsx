import React, { FC, memo } from 'react';
import { useStyles } from './SidebarContent.styles';
import { SidebarContentItems } from './../SidebarContentItems';
import { User } from '@interfaces/User';
import { clearAuthToken } from './../../../../helpers/auth';

interface Props {
  currentUser: User;
}

const SidebarContentComponent: FC<Props> = ({ currentUser }) => {
  const styles = useStyles();

  return (
    <>
      <div className={styles.navContianer}>
        <SidebarContentItems currentUser={currentUser} />
        <div
          className={styles.logOutButton}
          onClick={() => {
            clearAuthToken();
            window.location.reload();
          }}
        ></div>
      </div>
    </>
  );
};

export const SidebarContent = memo(SidebarContentComponent);
