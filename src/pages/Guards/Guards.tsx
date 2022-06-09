import React, { FC, useCallback, useState } from 'react';
import { Table } from './../../components/Table/Table';
import { useGuards } from './hooks/useGuards';
import { useStyles } from './Guards.styles';
import { Checkbox } from './../../components/Checkbox/Checkbox';
import { Guard } from '@interfaces/Guard';
import { useDispatch } from 'react-redux';
import { setSelectedElementsAction, createGuard, changeGuardAction } from './redux/actions';
import { SelectedElementsBlock } from '../../components/SelectedElementsBlock/SelectedElementsBlock';
import { Plus } from 'react-iconly';
import InputField from './components/InputField/InputField';
import { CustomPopup } from '../../components/CustomPopup/CustomPopup';

const Guards: FC = () => {
  const tableHeaders = [
    { title: 'Name' },
    { title: 'Surname' },
    { title: 'Email' },
    { title: 'Phone number' },
    { title: 'Birth date' },
    { title: 'Address' },
  ];

  const styles = useStyles();
  const guards = useGuards();
  const dispatch = useDispatch();
  const [selectedElements, setSelectedElements] = useState<Guard[]>([]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, element: Guard) => {
    setSelectedElements((selectedElements) =>
      e.target.checked ? [...selectedElements, element] : [...selectedElements.filter(({ id }) => id !== element.id)]
    );
  };

  const handleSubmitSettingSelectedElements = useCallback(() => {
    dispatch(setSelectedElementsAction(selectedElements.map((selectedElement) => selectedElement.id)));
    setSelectedElements([]);
  }, [selectedElements]);

  const tableContent =
    guards.data &&
    guards.data.map((guard) => {
      const { name, surname, email, phoneNumber, dateOfBirth, address } = guard;

      return (
        <tr key={email} className={styles.tableDataRow}>
          <td onClick={(e) => e.stopPropagation()}>
            <div className={styles.memberBlock}>
              <div className={styles.checkBoxContainer}>
                <Checkbox onChange={(e) => handleCheckboxChange(e, guard)} />
              </div>
              <InputField changeAction={changeGuardAction} defaultValue={name} object={guard} field={'name'} />
            </div>
          </td>
          <td>
            <InputField changeAction={changeGuardAction} defaultValue={surname} object={guard} field={'surname'} />
          </td>
          <td>
            <InputField changeAction={changeGuardAction} defaultValue={email} object={guard} field={'email'} />
          </td>
          <td>
            <InputField
              changeAction={changeGuardAction}
              defaultValue={phoneNumber}
              object={guard}
              field={'phoneNumber'}
            />
          </td>
          <td>
            <InputField
              type="date"
              changeAction={changeGuardAction}
              defaultValue={dateOfBirth}
              object={guard}
              field={'dateOfBirth'}
            />
          </td>
          <td>{address.country + ', ' + address.city + ', ' + address.street + ', ' + address.house}</td>
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

      <CustomPopup
        trigger={
          <div className={styles.plus} onClick={() => dispatch(createGuard())}>
            <Plus set="bold" primaryColor="blueviolet" />
          </div>
        }
      >
        <div>Add Guard</div>
      </CustomPopup>
      {selectedElements.length > 0 && (
        <SelectedElementsBlock
          selectedElements={selectedElements.map((selectedElement) => selectedElement.id)}
          handleSubmit={handleSubmitSettingSelectedElements}
        ></SelectedElementsBlock>
      )}
    </div>
  );
};

export default Guards;
