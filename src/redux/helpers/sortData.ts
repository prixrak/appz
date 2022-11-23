import { SortDirection } from '@enums/sortDirection';
import { SortInfo } from '@interfaces/SortInfo';
import get from 'lodash/get';

interface Comparable {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const sortData = <T extends Comparable>(data: T[], { field, sortDirection }: SortInfo): T[] => {
  const directionSign = sortDirection === SortDirection.Desc ? -1 : 1;
  let sortedData: T[] = [];
  sortedData = [...data].sort((item1, item2) => {
    const item1Value = get(item1, field);
    const item2Value = get(item2, field);

    return item1Value === null || item1Value === undefined
      ? directionSign
      : item2Value === null || item2Value === undefined
      ? -directionSign
      : typeof item1Value === 'number' && typeof item2Value === 'number'
      ? directionSign < 0
        ? item1Value - item2Value
        : item2Value - item1Value
      : typeof item1Value === 'string' && item1Value > item2Value
      ? directionSign
      : -directionSign;
  });
  return sortedData;
};
