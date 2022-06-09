import React from 'react';

import { useStyles } from './Sidebar.styles';
import { SidebarContent } from './components/SidebarContent';
import { User } from '@interfaces/User';

export interface Props {
  currentUser: User;
}

export const Sidebar: React.FC<Props> = ({ currentUser }) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <SidebarContent currentUser={currentUser} />
      </div>
    </div>
  );
};
