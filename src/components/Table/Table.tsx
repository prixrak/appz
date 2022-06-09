import Skeleton from 'react-loading-skeleton';
import { FC, memo, ReactNode } from 'react';
import { useStyles } from './Table.styles';
import { TableHeader } from './components/TableHeader/TableHeader';
import classNames from 'classnames';
import { TableHeaderData } from '@interfaces/TableHeaderData';

interface CustomStyles {
  root?: string;
  table?: string;
  tableHeaderRow?: string;
  tableDataRow?: string;
}
interface Props {
  isDataLoading: boolean;
  tableHeaders: TableHeaderData[];
  children: ReactNode;
  skeleton?: ReactNode;
  customStyles?: CustomStyles;
}

const TableComponent: FC<Props> = ({ isDataLoading, tableHeaders, children, skeleton, customStyles }) => {
  const styles = useStyles();

  const tableHeadersBlock = tableHeaders.map(({ title, fieldName }, i) => (
    <td key={i}>
      <TableHeader fieldName={fieldName} title={title}></TableHeader>
    </td>
  ));

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

  return (
    <div className={classNames(styles.root, customStyles?.root)}>
      <table className={classNames(styles.table, customStyles?.table)} cellSpacing={0}>
        <thead>
          <tr className={classNames(styles.tableHeaderRow, customStyles?.tableHeaderRow)}>{tableHeadersBlock}</tr>
        </thead>
        <tbody>{isDataLoading ? tableSkeleton : children}</tbody>
      </table>
    </div>
  );
};

export const Table = memo(TableComponent);
