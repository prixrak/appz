import React, { FC, memo } from 'react';
import { useStyles } from './SelectedElementsBlock.styles';

interface Props {
  selectedElements: number[];
  handleSubmit: () => void;
}

const SelectedElementsBlockComponent: FC<Props> = ({ selectedElements, handleSubmit }) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <p className={styles.startLabel}>{selectedElements.length} selected</p>
      {selectedElements.length > 0 && (
        <button className={styles.startButton} onClick={handleSubmit}>
          Delete guards
        </button>
      )}
    </div>
  );
};

export const SelectedElementsBlock = memo(SelectedElementsBlockComponent);
