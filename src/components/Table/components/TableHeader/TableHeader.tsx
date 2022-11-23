import React, { FC, memo, useCallback } from 'react';
import { ChevronDown, ChevronUp } from 'react-iconly';
import noop from 'lodash/noop';

import { COLORS } from '@styles/colors';
import { useStyles } from './TableHeader.styles';
import classNames from 'classnames';
import { SortDirection } from '@enums/sortDirection';
import { SortInfo } from '@interfaces/SortInfo';
import { TableHeaderData } from '@interfaces/TableHeaderData';
import { Checkbox } from './../../../Checkbox/Checkbox';

interface Props {
  sortInfo?: SortInfo;
  fieldName?: string;
  title?: string;
  onSortClick?: (sortInfo: SortInfo) => void;
  setTableHeaders?: React.Dispatch<React.SetStateAction<TableHeaderData[]>>;
  tableHeaders: TableHeaderData[];
}

const TableHeaderComponent: FC<Props> = ({
  title,
  sortInfo,
  fieldName,
  onSortClick,
  setTableHeaders,
  tableHeaders,
}) => {
  const styles = useStyles();
  const isArrowUpHighlighted = sortInfo && sortInfo.field === fieldName && sortInfo.sortDirection === SortDirection.Asc;
  const isArrowDownHighlighted =
    sortInfo && sortInfo.field === fieldName && sortInfo.sortDirection === SortDirection.Desc;

  const handleSortClick =
    fieldName &&
    sortInfo &&
    onSortClick &&
    useCallback(() => {
      onSortClick({
        field: fieldName,
        sortDirection:
          sortInfo.field === fieldName
            ? sortInfo.sortDirection === SortDirection.Desc
              ? SortDirection.Asc
              : SortDirection.Desc
            : SortDirection.Asc,
      });
    }, [fieldName, sortInfo, onSortClick]);

  return (
    <div className={styles.root}>
      <p
        className={classNames(styles.title, { [styles.sortableTitle]: !!handleSortClick })}
        onClick={handleSortClick || noop}
      >
        {title}
      </p>
      {fieldName && title && (
        <div className={styles.sortHolder} onClick={handleSortClick || noop}>
          <ChevronUp set="light" primaryColor={isArrowUpHighlighted ? COLORS.BLACK.DARK : COLORS.GRAY6} />
          <ChevronDown set="light" primaryColor={isArrowDownHighlighted ? COLORS.BLACK.DARK : COLORS.GRAY6} />
        </div>
      )}
      {setTableHeaders && (
        <Checkbox
          checked={tableHeaders.find((tableHeader) => tableHeader.fieldName === fieldName)?.isChecked}
          onChange={() =>
            setTableHeaders((state) =>
              tableHeaders.map((tableHeader) => {
                if (tableHeader.fieldName === fieldName) {
                  return {
                    ...tableHeader,
                    isChecked: !state.find((tableHeader) => tableHeader.fieldName === fieldName)?.isChecked,
                  };
                }
                return tableHeader;
              })
            )
          }
        />
      )}
    </div>
  );
};

export const TableHeader = memo(TableHeaderComponent);
