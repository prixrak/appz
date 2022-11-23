import { FilterInfo } from '@interfaces/FilterInfo';
import { TableHeaderData } from '@interfaces/TableHeaderData';
import React, { FC } from 'react';
import { useStyles } from './FilterOption.styles';
interface Props {
  field: TableHeaderData;
  setFilters: React.Dispatch<React.SetStateAction<FilterInfo[]>>;
  value: string;
}
export const FilterOption: FC<Props> = ({ field, setFilters, value }) => {
  const styles = useStyles();

  return (
    <>
      {field.fieldName && (
        <div className={styles.root}>
          <div>{field.title}:</div>
          <input
            value={value}
            type="text"
            onChange={(e) => {
              setFilters((state) =>
                state.some((filter) => filter.field === field.fieldName)
                  ? state.map((filter) =>
                      filter.field === field.fieldName ? { ...filter, value: e.target.value } : filter
                    )
                  : [...state, { field: field.fieldName as string, value: e.target.value }]
              );
              setFilters((state) => state.filter((filter) => filter.value !== ''));
            }}
          />
        </div>
      )}
    </>
  );
};
