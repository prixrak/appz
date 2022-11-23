import React, { FC, useCallback, useState } from 'react';
import { Table } from './../../components/Table/Table';
import { useStyles } from './ClientContracts.styles';
import { Checkbox } from './../../components/Checkbox/Checkbox';
import { ClientContractsData } from '@interfaces/ClientContractsData';
import { useDispatch } from 'react-redux';
import {
  setSelectedElementsAction,
  createClientContract,
  changeClientContractsAction,
  changeClientAction,
  addServicesAction,
} from './redux/actions';
import { SelectedElementsBlock } from '../../components/SelectedElementsBlock/SelectedElementsBlock';
import { Plus } from 'react-iconly';
import { useClientContracts } from './hooks/useClientContracts';
import InputField from './components/InputField/InputField';
import InputFieldClient from './components/InputFieldClient/InputFieldClient';
import Select, { MultiValue } from 'react-select';

const ClientContracts: FC = () => {
  const tableHeaders = [
    { title: 'Name', fieldName: 'name' },
    { title: 'Surname', fieldName: 'surname' },
    { title: 'Email', fieldName: 'email' },
    { title: 'Contract start date' },
    { title: 'Contract end date' },
    { title: 'Services' },
  ];

  const styles = useStyles();
  const contracts = useClientContracts();
  const dispatch = useDispatch();
  const [selectedElements, setSelectedElements] = useState<ClientContractsData[]>([]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, element: ClientContractsData) => {
    setSelectedElements((selectedElements) =>
      e.target.checked ? [...selectedElements, element] : [...selectedElements.filter(({ id }) => id !== element.id)]
    );
  };

  const handleSubmitSettingSelectedElements = useCallback(() => {
    dispatch(setSelectedElementsAction(selectedElements.map((selectedElement) => selectedElement.id)));
    setSelectedElements([]);
  }, [selectedElements]);

  type SelectValue = {
    label: string;
    value: number;
  };
  const handleChange = (newSelections: MultiValue<SelectValue>, contractId: number) => {
    dispatch(
      addServicesAction({
        servicesIds: newSelections.map((selection) => selection.value),
        contractId,
      })
    );
  };

  const tableContent =
    contracts.data &&
    contracts.data.map((contract) => {
      const { client, startDate, endDate, services, id, allServices } = contract;
      const { name, surname, email } = client ? client : { name: '', surname: '', email: '' };
      const options = allServices.map((service) => ({
        value: service.id,
        label: service.name,
      }));

      const defaultOptions = services ? services.map((service) => ({ value: service.id, label: service.name })) : null;
      return (
        <tr key={id} className={styles.tableDataRow}>
          <td onClick={(e) => e.stopPropagation()}>
            <div className={styles.memberBlock}>
              <div className={styles.checkBoxContainer}>
                <Checkbox onChange={(e) => handleCheckboxChange(e, contract)} />
              </div>
              <InputFieldClient changeAction={changeClientAction} defaultValue={name} object={client} field={'name'} />
            </div>
          </td>
          <td>
            <InputFieldClient
              changeAction={changeClientAction}
              defaultValue={surname}
              object={client}
              field={'surname'}
            />
          </td>
          <td>
            <InputFieldClient changeAction={changeClientAction} defaultValue={email} object={client} field={'email'} />
          </td>
          <td>
            <InputField
              changeAction={changeClientContractsAction}
              defaultValue={startDate ? startDate : ''}
              object={contract}
              field={'startDate'}
              type={'date'}
            />
          </td>
          <td>
            <InputField
              changeAction={changeClientContractsAction}
              defaultValue={endDate ? endDate : ''}
              object={contract}
              field={'endDate'}
              type={'date'}
            />
          </td>
          <td>
            <Select
              isMulti
              name="colors"
              options={options}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={(newSelections) => handleChange(newSelections, id)}
              defaultValue={defaultOptions}
            ></Select>
          </td>
        </tr>
      );
    });

  return (
    <div>
      <Table
        isDataLoading={false}
        tableHeaders={tableHeaders}
        customStyles={{ tableHeaderRow: styles.tableHeaderRow, tableDataRow: styles.tableDataRow }}
      >
        {tableContent}
      </Table>
      <div className={styles.plus} onClick={() => dispatch(createClientContract())}>
        <Plus set="bold" primaryColor="blueviolet" />
      </div>
      {selectedElements.length > 0 && (
        <SelectedElementsBlock
          selectedElements={selectedElements.map((selectedElement) => selectedElement.id)}
          handleSubmit={handleSubmitSettingSelectedElements}
          title="Delete contracts"
        ></SelectedElementsBlock>
      )}
    </div>
  );
};

export default ClientContracts;
