import React, { FC } from 'react';
import { useStyles } from './[FTName].styles';

export const [FTName]: FC = () => {
  const styles = useStyles();

  return <div className={styles.root}></div>;
};
