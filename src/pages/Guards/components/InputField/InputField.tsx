import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Guard } from '@interfaces/Guard';
import { useStyles } from './InputField.styles';
import { PayloadActionCreator } from '@reduxjs/toolkit';

interface Props {
  defaultValue: string;
  field: string;
  object: Guard;
  changeAction: PayloadActionCreator<Guard>;
  type?: string;
}
const InputField: FC<Props> = ({ defaultValue, field, object, changeAction, type = 'text' }) => {
  const dispatch = useDispatch();
  const styles = useStyles();

  return (
    <input
      type={type}
      defaultValue={defaultValue}
      onBlur={(e) => dispatch(changeAction({ ...object, [field]: e.target.value }))}
      className={styles.input}
    ></input>
  );
};

export default InputField;
