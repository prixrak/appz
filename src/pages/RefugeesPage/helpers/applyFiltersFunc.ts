import { AsyncData } from '@interfaces/AsyncData';
import { FilterInfo } from '@interfaces/FilterInfo';
import { cloneDeep, get } from 'lodash';
import { RefugeeData } from './../../../interfaces/RefugeeData';

export const applyFiltersFunc = (
  tableData: AsyncData<RefugeeData[]>,
  filters: FilterInfo[]
): AsyncData<RefugeeData[]> => {
  if (filters.length <= 0) {
    return tableData;
  }
  const tableDataCopy = cloneDeep(tableData);
  tableDataCopy.data = tableData.data
    ? tableData.data.filter((item) =>
        filters.every((filter) => {
          const fieldValue: string = get(item, filter.field);
          return fieldValue.toLocaleLowerCase().includes(filter.value.toLocaleLowerCase());
        })
      )
    : null;
  return tableDataCopy;
};
