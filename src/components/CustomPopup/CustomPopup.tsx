import React from 'react';
import Popup from 'reactjs-popup';
import { PopupProps } from 'reactjs-popup/dist/types';
import { useStyles } from './CustomPopup.styles';

export const CustomPopup: React.FC<PopupProps> = ({
  trigger,
  children,
  on = ['hover', 'focus'],
  position = 'top center',
}) => {
  const styles = useStyles();

  return (
    <Popup trigger={trigger} on={on} position={position} closeOnDocumentClick className={styles.resolvedPersonePopup}>
      {children}
    </Popup>
  );
};
