import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useStyles } from './InputFieldClient.styles';
import { PayloadActionCreator } from '@reduxjs/toolkit';
import { ClientData } from '@interfaces/ClientData';

interface Props {
  defaultValue: string;
  field: string;
  object: ClientData | null;
  changeAction: PayloadActionCreator<ClientData>;
}
const InputFieldClient: FC<Props> = ({ defaultValue, field, object, changeAction }) => {
  const dispatch = useDispatch();
  const styles = useStyles();

  return (
    <>
      {object && (
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

export default InputFieldClient;
