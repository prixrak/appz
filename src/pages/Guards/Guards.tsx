import React, { FC, useCallback, useState } from 'react';
import { Table } from './../../components/Table/Table';
import { useGuards } from './hooks/useGuards';
import { useStyles } from './Guards.styles';
import { Checkbox } from './../../components/Checkbox/Checkbox';
import { Address, Guard } from '@interfaces/Guard';
import { useDispatch } from 'react-redux';
import { setSelectedElementsAction, createGuard, changeGuardAction, editAddressAction } from './redux/actions';
import { SelectedElementsBlock } from '../../components/SelectedElementsBlock/SelectedElementsBlock';
import { Plus } from 'react-iconly';
import InputField from './components/InputField/InputField';
import { CustomPopup } from '../../components/CustomPopup/CustomPopup';
import { CustomModal } from '@components/CustomModal';
import { Field, Form, Formik } from 'formik';
import { ReactComponent as EditIcon } from '@assets/icons/edit.svg';
import classNames from 'classnames';

const Guards: FC = () => {
  const tableHeaders = [
    { title: 'Name' },
    { title: 'Surname' },
    { title: 'Email' },
    { title: 'Phone number' },
    { title: 'Birth date' },
    { title: 'Address' },
    { title: 'Married?' },
    { title: 'Worked As Security Guard?' },
    { title: 'Weight' },
  ];

  const styles = useStyles();
  const { guards, addresses: addressesAsync } = useGuards();
  const addresses = addressesAsync.data;
  const dispatch = useDispatch();
  const [selectedElements, setSelectedElements] = useState<Guard[]>([]);

  const [address, setAddress] = useState<Address>();

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, element: Guard) => {
    setSelectedElements((selectedElements) =>
      e.target.checked ? [...selectedElements, element] : [...selectedElements.filter(({ id }) => id !== element.id)]
    );
  };
  const handleFormSubmit = useCallback((values) => {
    dispatch(editAddressAction(values));
    setAddress(undefined);
  }, []);

  const handleSubmitSettingSelectedElements = useCallback(() => {
    dispatch(setSelectedElementsAction(selectedElements.map((selectedElement) => selectedElement.id)));
    setSelectedElements([]);
  }, [selectedElements]);

  const tableContent =
    guards.data &&
    guards.data.map((guard) => {
      const { name, surname, email, phoneNumber, dateOfBirth, address, isMarried, didWorkedAsSecurityGuard, weight } =
        guard;

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
          <td>
            <div
              className={styles.editAddress}
              onClick={() =>
                setAddress({
                  id: address.id ? address.id : undefined,
                  city: address.city ? address.city : 'Lviv',
                  country: address.country ? address.country : 'Ukraine',
                  street: address.street ? address.street : addresses?.streets ? addresses?.streets[0].name : '',
                  house: address.house ? address.house : 1,
                  apartment: address.apartment ? address.apartment : 1,
                  guardId: guard.id,
                })
              }
            >
              {address.country + ', ' + address.city + ', ' + address.street + ', ' + address.house} <EditIcon />
            </div>
          </td>
          <td>
            <input
              type="checkbox"
              checked={isMarried}
              onChange={(e) => dispatch(changeGuardAction({ ...guard, isMarried: e.target.checked }))}
            />
          </td>
          <td>
            <input
              type="checkbox"
              checked={didWorkedAsSecurityGuard}
              onChange={(e) => dispatch(changeGuardAction({ ...guard, didWorkedAsSecurityGuard: e.target.checked }))}
            />
          </td>
          <td>
            <InputField
              changeAction={changeGuardAction}
              defaultValue={'' + weight ? weight : ''}
              object={guard}
              field={'weight'}
            />
          </td>
        </tr>
      );
    });

  return (
    <div className={styles.root}>
      <div className={styles.tableContainer}>
        <Table
          isDataLoading={false}
          tableHeaders={tableHeaders}
          customStyles={{ tableHeaderRow: styles.tableHeaderRow, tableDataRow: styles.tableDataRow }}
        >
          {tableContent}
        </Table>
      </div>

      <div className={styles.addGuard}>
        <CustomPopup
          trigger={
            <div className={styles.plus} onClick={() => dispatch(createGuard())}>
              <Plus set="bold" primaryColor="blueviolet" />
            </div>
          }
        >
          <div>Add Guard</div>
        </CustomPopup>
      </div>
      {selectedElements.length > 0 && (
        <SelectedElementsBlock
          selectedElements={selectedElements.map((selectedElement) => selectedElement.id)}
          handleSubmit={handleSubmitSettingSelectedElements}
          title="Delete guards"
        ></SelectedElementsBlock>
      )}
      <CustomModal isOpen={!!address} onClose={() => setAddress(undefined)} title="Change address of guard" crossIcon>
        {address && (
          <Formik enableReinitialize={true} initialValues={address} onSubmit={handleFormSubmit}>
            {() => (
              <Form>
                <div>
                  <div className={styles.fieldBlock}>
                    <label className={styles.label}>Country</label>
                    <Field as="select" name="country">
                      {addresses?.countries.map((country) => (
                        <option key={country.id} value={country.name}>
                          {country.name}
                        </option>
                      ))}
                    </Field>
                  </div>
                  <div className={styles.fieldBlock}>
                    <label className={styles.label}>City</label>
                    <Field as="select" name="city">
                      {addresses?.cities.map((city) => (
                        <option key={city.id} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                    </Field>
                  </div>
                  <div className={styles.fieldBlock}>
                    <label className={styles.label}>Street</label>
                    <Field as="select" name="street">
                      {addresses?.streets.map((street) => (
                        <option key={street.id} value={street.name}>
                          {street.name}
                        </option>
                      ))}
                    </Field>
                  </div>
                </div>
                <div className={styles.fieldBlock}>
                  <label className={styles.label}>House number</label>
                  <Field min={0} name="house" type="number" className={styles.inputField} />
                </div>
                <div className={styles.fieldBlock}>
                  <label className={styles.label}>Apartment number</label>
                  <Field min={0} name="apartment" type="number" className={styles.inputField} />
                </div>
                <div className={styles.buttonsBlock}>
                  <button
                    className={classNames(styles.button, styles.buttonClose)}
                    onClick={() => setAddress(undefined)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className={styles.button}>
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </CustomModal>
    </div>
  );
};

export default Guards;
