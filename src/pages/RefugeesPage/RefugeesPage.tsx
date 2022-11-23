import { Table } from '@components/Table';
import { DataState } from '@enums/DataState';
import { SortInfo } from '@interfaces/SortInfo';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { useRefugeesPageData } from './hooks/useRefugeesPageData';
import { setFilterInfo, setSortInfo } from './redux';
import { useStyles } from './RefugeesPage.styles';
import { MovedFromModal } from './components/MovedFromModal';
import { ReactComponent as ChartIcon } from '@assets/icons/chart.svg';
import { CSVLink } from 'react-csv';
import { TableHeaderData } from '@interfaces/TableHeaderData';
import { displayNotification } from '@redux/notifications/actions';
import { get } from 'lodash';
import { Data } from 'react-csv/components/CommonPropTypes';
import { CustomPopup } from '@components/CustomPopup/CustomPopup';
import { FilterInfo } from '@interfaces/FilterInfo';
import { FilterOption } from './components/FilterOption';

export const RefugeesPage: FC = () => {
  const [tableHeaders, setTableHeaders] = useState<TableHeaderData[]>([
    { title: 'Name', fieldName: 'name', isChecked: false },
    { title: 'Email', fieldName: 'email', isChecked: false },
    { title: 'Phone', fieldName: 'phone', isChecked: false },
    { title: 'Moved from', fieldName: 'moved_from_city', isChecked: false },
    { title: 'Moved to', fieldName: 'moved_to_city', isChecked: false },
  ]);

  const [openModalForMovedFrom, setOpenModalForMovedFrom] = useState(false);
  const [openModalForMovedTo, setOpenModalForMovedTo] = useState(false);
  const [scvExportData, setScvExportData] = useState<string | Data | (() => string | Data)>([]);
  const headersChecked = tableHeaders.filter((item) => item.isChecked);
  const [filters, setFilters] = useState<FilterInfo[]>([]);

  useEffect(() => {
    const headersCSV = headersChecked.map((item) => item.title);
    const data = refugees.data?.map((item) => {
      const data = headersChecked.map((header) => (header.fieldName ? get(item, header.fieldName) : ''));
      return data;
    });
    data && setScvExportData([headersCSV, ...data]);
  }, [tableHeaders]);

  const styles = useStyles();
  const refugees = useRefugeesPageData();
  const dispatch = useDispatch();
  const sortInfo = useSelector<RootState, SortInfo>((state) => state.refugeesReducer.sortInfo);
  const onTableSortClick = useCallback((sortInfo) => dispatch(setSortInfo(sortInfo)), [dispatch]);

  const isDataLoading = refugees.state === DataState.Pending;
  const tableContent =
    refugees.data &&
    refugees.data.map((refugee) => {
      const { id, name, email, phone, moved_from_city, moved_to_city } = refugee;

      return (
        <tr key={id} className={styles.tableDataRow} onClick={(e) => e.stopPropagation()}>
          <td>{name}</td>
          <td>{email}</td>
          <td>{phone ? phone : '---------'}</td>
          <td>{moved_from_city}</td>
          <td>{moved_to_city}</td>
        </tr>
      );
    });

  useEffect(() => {
    dispatch(setFilterInfo(filters));
  }, [filters]);

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.title}>Refugees ({isDataLoading ? '...' : refugees.data?.length})</div>
        <div className={styles.selectsWrapper}>
          <CustomPopup trigger={<div className={styles.chartBtn}>Filters</div>} on="click" position="bottom center">
            <div className={styles.options}>
              {tableHeaders.map(
                (item) =>
                  item.fieldName && (
                    <FilterOption
                      value={filters.find((filter) => item.fieldName == filter.field)?.value || ''}
                      key={item.fieldName}
                      field={item}
                      setFilters={setFilters}
                    />
                  )
              )}
            </div>
            <div className={styles.chartBtn} onClick={() => setFilters([])}>
              Clear filters
            </div>
          </CustomPopup>
          <CustomPopup
            trigger={
              <div className={styles.chartBtn}>
                Charts <ChartIcon />
              </div>
            }
            on="click"
            position="bottom center"
          >
            <div className={styles.options}>
              <div className={styles.chartBtn} onClick={() => setOpenModalForMovedTo(true)}>
                Moved to
              </div>
              <div className={styles.chartBtn} onClick={() => setOpenModalForMovedFrom(true)}>
                Moved from
              </div>
            </div>
          </CustomPopup>
          <CustomPopup trigger={<div className={styles.chartBtn}>Export</div>} on="click" position="bottom center">
            <div className={styles.options}>
              <CSVLink
                onClick={() => {
                  if (!tableHeaders.filter((header) => header.isChecked).length) {
                    dispatch(displayNotification('Please specify the fields you want to export'));
                    return false;
                  }
                }}
                className={styles.chartBtn}
                filename={'csvRefugees.csv'}
                separator={','}
                data={scvExportData}
              >
                Export CSV
              </CSVLink>
              <div
                className={styles.chartBtn}
                onClick={() => {
                  if (!tableHeaders.filter((header) => header.isChecked).length) {
                    dispatch(displayNotification('Please specify the fields you want to export'));
                    return true;
                  }
                  const fileData = JSON.stringify(
                    refugees.data?.map((item) => {
                      return headersChecked.reduce((acc, header) => {
                        return header.fieldName
                          ? { ...acc, [header.fieldName]: get(item, header.fieldName) }
                          : { ...acc };
                      }, {});
                    })
                  );
                  const blob = new Blob([fileData], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const link = document.createElement('a');
                  link.download = 'jsonRefugees.json';
                  link.href = url;
                  link.click();
                }}
              >
                Export JSON
              </div>
            </div>
          </CustomPopup>
        </div>
      </div>
      <Table
        setTableHeaders={setTableHeaders}
        sortInfo={sortInfo}
        onSortClick={onTableSortClick}
        isDataLoading={isDataLoading}
        tableHeaders={tableHeaders}
        // skeleton={tableSkeleton}
        customStyles={{
          // root: classNames(tableRootClassName),
          tableHeaderRow: styles.tableHeaderRow,
          tableDataRow: styles.tableDataRow,
        }}
      >
        {tableContent}
      </Table>
      {refugees.data && (
        <MovedFromModal
          title={'Moved from'}
          fieldName="moved_from_city"
          isOpen={openModalForMovedFrom}
          setIsOpen={setOpenModalForMovedFrom}
          data={refugees.data}
        />
      )}
      {refugees.data && (
        <MovedFromModal
          title={'Moved to'}
          fieldName="moved_to_city"
          isOpen={openModalForMovedTo}
          setIsOpen={setOpenModalForMovedTo}
          data={refugees.data}
        />
      )}
    </div>
  );
};
