import { DataState } from '@enums/DataState';
import { CustomPopup } from '../../components/CustomPopup/CustomPopup';
import { SelectedElementsBlock } from '../../components/SelectedElementsBlock';
import React, { FC, useCallback, useState } from 'react';
import { Plus } from 'react-iconly';
import { Table } from '../../components/Table/Table';
import { useStyles } from './GuardsContracts.styles';
import { useGuardsContracts } from './hooks/useGuards';
import { GuardContract } from '@interfaces/GuardContract';
import { Checkbox } from '../../components/Checkbox';
import InputField from './components/InputField/InputField';
import { changeGuardContractAction, createGuardContract, setSelectedElementsAction } from './redux/actions';
import { useDispatch } from 'react-redux';
import Select, { SingleValue } from 'react-select';

const GuardsContracts: FC = () => {
  const tableHeaders = [
    { title: 'Full name' },
    { title: 'Base Salary' },
    { title: 'Start Date' },
    { title: 'End Date' },
    { title: 'Contract Number' },
    { title: 'Signed Date' },
    { title: 'Description' },
  ];

  const styles = useStyles();
  const { guardsContracts, allGuards } = useGuardsContracts();
  const [selectedElements, setSelectedElements] = useState<GuardContract[]>([]);
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, element: GuardContract) => {
    setSelectedElements((selectedElements) =>
      e.target.checked ? [...selectedElements, element] : [...selectedElements.filter(({ id }) => id !== element.id)]
    );
  };

  const tableContent =
    guardsContracts.state === DataState.Fulfilled &&
    guardsContracts.data &&
    guardsContracts.data.contracts.map((contract) => {
      const { id, guard, baseSalary, startDate, endDate, contractNumber, description, signedDate } = contract;

      return (
        <tr key={id} className={styles.tableDataRow}>
          <td>
            <div className={styles.memberBlock}>
              <div className={styles.checkBoxContainer}>
                <Checkbox onChange={(e) => handleCheckboxChange(e, contract)} />
              </div>
              {guard}
            </div>
          </td>
          <td>
            <InputField
              changeAction={changeGuardContractAction}
              defaultValue={baseSalary ? '' + baseSalary : ''}
              object={contract}
              field={'baseSalary'}
            />
          </td>
          <td>
            <InputField
              changeAction={changeGuardContractAction}
              defaultValue={startDate ? startDate : ''}
              object={contract}
              field={'startDate'}
              type={'date'}
            />
          </td>
          <td>
            <InputField
              changeAction={changeGuardContractAction}
              defaultValue={endDate ? endDate : ''}
              object={contract}
              field={'endDate'}
              type={'date'}
            />
          </td>
          <td>
            <InputField
              changeAction={changeGuardContractAction}
              defaultValue={contractNumber ? '' + contractNumber : ''}
              object={contract}
              field={'contractNumber'}
            />
          </td>
          <td>
            <InputField
              changeAction={changeGuardContractAction}
              defaultValue={signedDate ? signedDate : ''}
              object={contract}
              field={'signedDate'}
              type={'date'}
            />
          </td>
          <td>
            <InputField
              changeAction={changeGuardContractAction}
              defaultValue={description ? '' + description : ''}
              object={contract}
              field={'description'}
            />
          </td>
        </tr>
      );
    });

  const dispatch = useDispatch();
  const handleSubmitSettingSelectedElements = useCallback(() => {
    dispatch(setSelectedElementsAction(selectedElements.map((selectedElement) => selectedElement.id)));
    setSelectedElements([]);
  }, [selectedElements]);

  type SelectValue = {
    label: string;
    value: string;
  };
  const [guardSelectedId, setGuardSelectedId] = useState<string | undefined>('');
  const handleChange = (newSelection: SingleValue<SelectValue>) => {
    setGuardSelectedId(newSelection?.value);
  };

  const options = allGuards.data
    ? allGuards.data?.map((guard) => ({
        value: guard.id + '',
        label: guard.name + ' ' + guard.surname,
      }))
    : [];
  return (
    <div>
      <div className={styles.tableContainer}>
        <Table
          isDataLoading={false}
          tableHeaders={tableHeaders}
          customStyles={{ tableHeaderRow: styles.tableHeaderRow, tableDataRow: styles.tableDataRow }}
        >
          {tableContent}
        </Table>
      </div>
      <div className={styles.flex}>
        <CustomPopup
          trigger={
            <div
              className={styles.plus}
              onClick={() => {
                if (guardSelectedId) dispatch(createGuardContract(guardSelectedId));
              }}
            >
              <Plus set="bold" primaryColor="blueviolet" />
            </div>
          }
        >
          <div>Add Contract</div>
        </CustomPopup>
        <div style={{ width: '300px' }}>
          <Select
            name="colors"
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleChange}
            menuPlacement="top"
          ></Select>
        </div>
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

export default GuardsContracts;
