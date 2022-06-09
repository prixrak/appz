import React from 'react';
import Popup from 'reactjs-popup';
import { PopupProps } from 'reactjs-popup/dist/types';
import { useStyles } from './CustomPopup.styles';

export const CustomPopup: React.FC<PopupProps> = ({ trigger, children }) => {
  const styles = useStyles();

  return (
    <Popup trigger={trigger} on={['hover', 'focus']} position="top center" className={styles.resolvedPersonePopup}>
      {children}
    </Popup>
  );
};
