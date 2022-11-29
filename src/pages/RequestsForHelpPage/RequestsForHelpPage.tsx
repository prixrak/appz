import { Table } from '@components/Table';
import { DataState } from '@enums/DataState';
import { SortInfo } from '@interfaces/SortInfo';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { useRequestsForHelpPageData } from './hooks/useRequestsForHelpPageData';
import { setFilterInfo, setSortInfo } from './redux';
import { useStyles } from './RequestsForHelpPage.styles';
import { ReactComponent as ChartIcon } from '@assets/icons/chart.svg';
import { CSVLink } from 'react-csv';
import { TableHeaderData } from '@interfaces/TableHeaderData';
import { displayNotification } from '@redux/notifications/actions';
import { capitalize, get } from 'lodash';
import { Data } from 'react-csv/components/CommonPropTypes';
import { CustomPopup } from '@components/CustomPopup/CustomPopup';
import { FilterInfo } from '@interfaces/FilterInfo';
import { FilterOption } from '../../components/FilterOption';
import { ChartModal } from '@components/ChartModal';
import { ReactComponent as NoDataSvg } from '@assets/icons/noData.svg';

export const RequestsForHelpPage: FC = () => {
  const [tableHeaders, setTableHeaders] = useState<TableHeaderData[]>([
    { title: 'Title', fieldName: 'title', isChecked: false },
    { title: 'Refugee', fieldName: 'refugee.name', isChecked: false },
    { title: 'Responsible worker', fieldName: 'worker.name', isChecked: false },
    { title: 'Number of people', fieldName: 'number_of_people', isChecked: false },
    { title: 'Type', fieldName: 'type', isChecked: false },
    { title: 'Status', fieldName: 'status', isChecked: false },
  ]);

  const [openModalForMovedFrom, setOpenModalForMovedFrom] = useState(false);
  const [openModalForMovedTo, setOpenModalForMovedTo] = useState(false);
  const [scvExportData, setScvExportData] = useState<string | Data | (() => string | Data)>([]);
  const headersChecked = tableHeaders.filter((item) => item.isChecked);
  const [filters, setFilters] = useState<FilterInfo[]>([]);

  useEffect(() => {
    const headersCSV = headersChecked.map((item) => item.title);
    const data = requestForHelp.data?.map((item) => {
      const data = headersChecked.map((header) => (header.fieldName ? get(item, header.fieldName) : ''));
      return data;
    });
    data && setScvExportData([headersCSV, ...data]);
  }, [tableHeaders]);

  const styles = useStyles();
  const requestForHelp = useRequestsForHelpPageData();
  const dispatch = useDispatch();
  const sortInfo = useSelector<RootState, SortInfo>((state) => state.requestsForHelpReducer.sortInfo);
  const onTableSortClick = useCallback((sortInfo) => dispatch(setSortInfo(sortInfo)), [dispatch]);

  const isDataLoading = requestForHelp.state === DataState.Pending;
  const tableContent =
    requestForHelp.data &&
    requestForHelp.data.map((requestforhelp) => {
      const { id, title, refugee, worker, type, status, number_of_people } = requestforhelp;

      return (
        <tr key={id} className={styles.tableDataRow} onClick={(e) => e.stopPropagation()}>
          <td>{title}</td>
          <td>{refugee.name}</td>
          <td>{capitalize(worker.name)}</td>
          <td>{number_of_people}</td>
          <td>{capitalize(type)}</td>
          <td>{capitalize(status)}</td>
        </tr>
      );
    });

  useEffect(() => {
    dispatch(setFilterInfo(filters));
  }, [filters]);

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.title}>Requests for help ({isDataLoading ? '...' : requestForHelp.data?.length})</div>
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
                By status
              </div>
              <div className={styles.chartBtn} onClick={() => setOpenModalForMovedFrom(true)}>
                By type
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
                filename={'csvRequestsForHelp.csv'}
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
                    requestForHelp.data?.map((item) => {
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
                  link.download = 'jsonRequestsForHelp.json';
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
      {requestForHelp.data?.length === 0 && !isDataLoading ? (
        <div className={styles.noData}>
          <NoDataSvg />
        </div>
      ) : (
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
      )}
      {requestForHelp.data && (
        <ChartModal
          title={'By status'}
          fieldName="status"
          isOpen={openModalForMovedTo}
          setIsOpen={setOpenModalForMovedTo}
          data={requestForHelp.data}
        />
      )}
      {requestForHelp.data && (
        <ChartModal
          title={'By type'}
          fieldName="type"
          isOpen={openModalForMovedFrom}
          setIsOpen={setOpenModalForMovedFrom}
          data={requestForHelp.data}
        />
      )}
    </div>
  );
};
