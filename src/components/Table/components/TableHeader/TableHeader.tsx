import React, { FC, memo } from 'react';

import { useStyles } from './TableHeader.styles';

interface Props {
  fieldName?: string;
  title?: string;
}

const TableHeaderComponent: FC<Props> = ({ title }) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <p className={styles.title}>{title}</p>
    </div>
  );
};

export const TableHeader = memo(TableHeaderComponent);
