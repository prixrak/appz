import { Notifications } from '../Notifications';
import React, { ReactNode } from 'react';
import { User } from '../../interfaces/User';
import { Sidebar } from '../Sidebar';
import { useStyles } from './styles';

interface Props {
  children: ReactNode;
  currentUser: User | null;
}

export const DefaultLayout: React.FC<Props> = ({ children, currentUser }) => {
  const styles = useStyles();

  return (
    <div className={styles.root} id="layout-root">
      {currentUser && <Sidebar currentUser={currentUser} />}
      <div className={styles.body}>{children}</div>
      <div className={styles.notificationsHolder}>
        <Notifications></Notifications>
      </div>
    </div>
  );
};
