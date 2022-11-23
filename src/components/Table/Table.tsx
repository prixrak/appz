import Skeleton from 'react-loading-skeleton';
import React, { FC, ReactNode, useEffect, useState } from 'react';
import { useStyles } from './Table.styles';
import { TableHeader } from './components/TableHeader/TableHeader';
import classNames from 'classnames';
import noop from 'lodash/noop';
import throttle from 'lodash/throttle';
import { SortInfo } from '@interfaces/SortInfo';
import { TableHeaderData } from '@interfaces/TableHeaderData';

const SCROLL_THROTTLE_MS = 500;

interface CustomStyles {
  root?: string;
  table?: string;
  tableHeaderRow?: string;
  tableDataRow?: string;
}
interface Props {
  sortInfo?: SortInfo;
  isDataLoading: boolean;
  onSortClick?: (sortInfo: SortInfo) => void;
  onScrollThresholdPass?: () => void;
  tableHeaders: TableHeaderData[];
  children: ReactNode;
  scrollTresholdPx?: number;
  skeleton?: ReactNode;
  customStyles?: CustomStyles;
  isDataChunkLoading?: boolean;
  setTableHeaders?: React.Dispatch<React.SetStateAction<TableHeaderData[]>>;
}

export const Table: FC<Props> = ({
  sortInfo,
  isDataLoading,
  isDataChunkLoading = false,
  onSortClick,
  onScrollThresholdPass = noop,
  scrollTresholdPx = 1500,
  tableHeaders,
  children,
  skeleton,
  customStyles,
  setTableHeaders,
}) => {
  const styles = useStyles();
  const [isScrollToTopButtonVisible, setIsScrollToTopButtonVisible] = useState(false);
  const tableHeadersBlock = tableHeaders.map(({ title, fieldName }, i) => (
    <td key={i}>
      <TableHeader
        tableHeaders={tableHeaders}
        setTableHeaders={setTableHeaders}
        sortInfo={sortInfo}
        onSortClick={onSortClick}
        fieldName={fieldName}
        title={title}
      ></TableHeader>
    </td>
  ));

  useEffect(() => {
    const handleDocumentScroll = throttle(() => {
      if (
        document.documentElement.scrollHeight -
          document.documentElement.scrollTop -
          document.documentElement.clientHeight <
        scrollTresholdPx
      ) {
        onScrollThresholdPass();
      }
    }, SCROLL_THROTTLE_MS);
    document.addEventListener('scroll', handleDocumentScroll);

    return () => document.removeEventListener('scroll', handleDocumentScroll);
  }, [onScrollThresholdPass]);

  useEffect(() => {
    const handleDocumentScroll = throttle(() => {
      const isButtonVisible = document.documentElement.scrollTop > document.documentElement.clientHeight * 2;
      setIsScrollToTopButtonVisible(isButtonVisible);
    }, SCROLL_THROTTLE_MS);
    document.addEventListener('scroll', handleDocumentScroll);

    return () => document.removeEventListener('scroll', handleDocumentScroll);
  }, [onScrollThresholdPass]);

  const tableSkeleton =
    skeleton ||
    Array(5)
      .fill(0)
      .map((_, i) => (
        <tr className={classNames(styles.tableDataRow, customStyles?.tableDataRow)} key={i}>
          {tableHeaders.map((_, j) => (
            <td key={j}>
              <Skeleton className={styles.textSkeleton} />
            </td>
          ))}
        </tr>
      ));

  const scrollToTop = () =>
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

  return (
    <div className={classNames(styles.root, customStyles?.root)}>
      {isScrollToTopButtonVisible && (
        <div className={styles.backToTopButton} onClick={scrollToTop}>
          ^ Back to top
        </div>
      )}

      <table className={classNames(styles.table, customStyles?.table)} cellSpacing={0}>
        <thead>
          <tr className={classNames(styles.tableHeaderRow, customStyles?.tableHeaderRow)}>{tableHeadersBlock}</tr>
        </thead>
        <tbody>
          {isDataLoading ? tableSkeleton : children}
          {isDataChunkLoading && (
            <tr>
              <td colSpan={999}>
                <div className={styles.loaderHolder}>...</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
