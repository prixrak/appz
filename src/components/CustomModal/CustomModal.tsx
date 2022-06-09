import React, { FC, memo, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useStyles } from './CustomModal.styles';
import { ReactComponent as CrossIcon } from '@assets/icons/cross.svg';
import classNames from 'classnames';

interface Props {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  modalStyles?: string;
  modalHeaderStyles?: string;
  modalTitleStyles?: string;
  crossIcon: boolean;
  modalBodyStyles?: string;
}

const CustomModalComponent: FC<Props> = ({
  title,
  children,
  isOpen,
  onClose,
  modalStyles,
  modalHeaderStyles,
  modalTitleStyles,
  crossIcon,
  modalBodyStyles,
}) => {
  const styles = useStyles();
  const layoutRoot = document.getElementById('layout-root')!;

  return (
    layoutRoot &&
    createPortal(
      isOpen ? (
        <div className={styles.root}>
          <div className={styles.overlay} onClick={onClose}></div>
          <div className={classNames(styles.modal, modalStyles)}>
            <div className={classNames(styles.header, modalHeaderStyles)}>
              <h2 className={classNames(styles.title, modalTitleStyles)}>{title}</h2>
              {crossIcon && <CrossIcon onClick={onClose} className={styles.crossIcon} />}
            </div>
            <div className={classNames(styles.modalBody, modalBodyStyles)}>{children}</div>
          </div>
        </div>
      ) : null,
      layoutRoot
    )
  );
};

export const CustomModal = memo(CustomModalComponent);
