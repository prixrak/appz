import React, { FC } from 'react';
import { useStyles } from './Plus.styles';
import { Plus as PlusIcon } from 'react-iconly';

interface Props {
  onClick: () => void;
}
export const Plus: FC<Props> = ({ onClick }) => {
  const styles = useStyles();

  return (
    <div className={styles.plus} onClick={onClick}>
      <PlusIcon set="bold" primaryColor="blueviolet" />
    </div>
  );
};
