import React, { FC, memo } from 'react';
import { useStyles } from './SelectedElementsBlock.styles';

interface Props {
  selectedElements: number[];
  handleSubmit: () => void;
  title: string;
}

const SelectedElementsBlockComponent: FC<Props> = ({ selectedElements, handleSubmit, title }) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <p className={styles.startLabel}>{selectedElements.length} selected</p>
      {selectedElements.length > 0 && (
        <button className={styles.startButton} onClick={handleSubmit}>
          {title}
        </button>
      )}
    </div>
  );
};

export const SelectedElementsBlock = memo(SelectedElementsBlockComponent);
