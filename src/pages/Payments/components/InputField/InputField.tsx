import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useStyles } from './InputField.styles';
import { PayloadActionCreator } from '@reduxjs/toolkit';
import { PaymentsData } from '@interfaces/PaymentsData';

interface Props {
  defaultValue: string | number;
  field: string;
  object: PaymentsData;
  changeAction: PayloadActionCreator<PaymentsData>;
  notChangble?: boolean;
}
const InputField: FC<Props> = ({ defaultValue, field, object, changeAction, notChangble = false }) => {
  const dispatch = useDispatch();
  const styles = useStyles();

  return (
    <>
      {notChangble ? (
        <div>{defaultValue}</div>
      ) : (
        <input
          type="text"
          defaultValue={defaultValue}
          onBlur={(e) => dispatch(changeAction({ ...object, [field]: e.target.value }))}
          className={styles.input}
        ></input>
      )}
    </>
  );
};

export default InputField;
