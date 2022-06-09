import { nanoid } from '@reduxjs/toolkit';
import React, { ChangeEvent, FC, memo } from 'react';
import { useStyles } from './Checkbox.styles';

interface Props {
  children?: React.ReactNode;
  checked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
const CheckboxComponent: FC<Props> = ({ children, checked, onChange }) => {
  const checkboxId = nanoid();
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div className={styles.checkboxContainer}>
        <input onChange={onChange} type="checkbox" id={checkboxId} className={styles.checkMarker} checked={checked} />
        <div className={styles.checkmark}></div>
      </div>
      {children && (
        <label className={styles.checkboxLabel} htmlFor={checkboxId}>
          {children}
        </label>
      )}
    </div>
  );
};

export const Checkbox = memo(CheckboxComponent);
