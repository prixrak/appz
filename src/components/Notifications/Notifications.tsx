import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useStyles } from './Notifications.styles';
import uniqBy from 'lodash/uniqBy';
import { RootState } from 'redux/store';
import { Notification } from '@interfaces/Notification';
import { NotificationBlock } from './components/NotificationBlock';

interface NotificationRenderData {
  message: string;
  id: string;
}

const NotificationsComponent: FC = () => {
  const styles = useStyles();
  const [displayedNotifications, setDisplayedNotifications] = useState<NotificationRenderData[]>([]);
  const notifications = useSelector<RootState, Notification[]>((state) => state.notificationsReducer.notifications);

  useEffect(() => {
    setDisplayedNotifications((displayedNotifications) => uniqBy([...displayedNotifications, ...notifications], 'id'));
  }, [notifications]);

  const deleteNotification = useCallback((id) => {
    setDisplayedNotifications((displayedNotifications) => displayedNotifications.filter((dn) => dn.id !== id));
  }, []);

  return (
    <div className={styles.root}>
      {displayedNotifications.map(({ message, id }) => (
        <NotificationBlock
          message={message}
          id={id}
          key={id}
          isMarkedForDeletion={notifications.every((n) => n.id !== id)}
          afterFadeOutComplete={(id) => deleteNotification(id)}
        />
      ))}
    </div>
  );
};

export const Notifications = memo(NotificationsComponent);
