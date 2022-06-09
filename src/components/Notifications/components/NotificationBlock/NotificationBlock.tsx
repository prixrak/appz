import React, { FC, memo, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useStyles } from './NotificationBlock.styles';

interface Props {
  message: string;
  id: string;
  isMarkedForDeletion: boolean;
  afterFadeOutComplete: (id: string) => void;
}

const NOTIFICATION_OUTRO_ANIMANTION_DURATION_MS = 200;
const NOTIFICATION_INTRO_ANIMANTION_DURATION_MS = 100;

const NotificationComponent: FC<Props> = ({ message, id, isMarkedForDeletion, afterFadeOutComplete }) => {
  const styles = useStyles();
  const [isIntroAnimationFinished, setIsIntroAnimationFinished] = useState(false);

  useEffect(() => {
    if (isMarkedForDeletion) {
      setTimeout(() => afterFadeOutComplete(id), NOTIFICATION_OUTRO_ANIMANTION_DURATION_MS);
    }
  }, [isMarkedForDeletion, id, afterFadeOutComplete]);

  useEffect(() => {
    setTimeout(() => setIsIntroAnimationFinished(true), NOTIFICATION_INTRO_ANIMANTION_DURATION_MS);
  }, []);

  return (
    <div
      className={classNames(styles.root, {
        [styles.outro]: isMarkedForDeletion,
        [styles.intro]: !isIntroAnimationFinished,
      })}
    >
      {message}
    </div>
  );
};

export const NotificationBlock = memo(NotificationComponent);
