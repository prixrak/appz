import React, { FC, useCallback, useEffect, useState } from 'react';
import { Table } from '../../components/Table/Table';
import { useStyles } from './Payments.styles';
import { PaymentsData } from '@interfaces/PaymentsData';
import { useDispatch } from 'react-redux';
import { addBonusesToContract, changePaymentsAction, makePayment } from './redux/actions';
import { usePayments } from './hooks/usePayments';
import { CustomModal } from '../../components/CustomModal';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import classNames from 'classnames';
import { format } from 'date-fns';
import parseISO from 'date-fns/parseISO';
import sub from 'date-fns/sub';
import InputField from './components/InputField/InputField';
import { CustomPopup } from '../../components/CustomPopup/CustomPopup';
import { PaymentForm } from '@interfaces/PaymentForm';
import { PaymentByIdData } from '@interfaces/PaymentByIdData';
import Select, { MultiValue } from 'react-select';
import { ReactComponent as InfoIcon } from '@assets/icons/info.svg';

const Payments: FC = () => {
  const [open, setOpen] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState<PaymentsData>();
  const [paymentsById, setPaymentsById] = useState<PaymentByIdData[]>();
  const [openPaymentsById, setOpenPaymentsById] = useState(false);

  const tableHeaders = [
    { title: 'Full name' },
    { title: 'Email' },
    { title: 'Base Salary' },
    { title: 'Iban' },
    { title: 'Card number' },
    { title: 'Bonuses' },
    { title: 'Action' },
  ];

  const styles = useStyles();
  const { guards, allBonuses } = usePayments();
  const dispatch = useDispatch();
  type SelectValue = {
    label: string;
    value: number;
  };
  const handleChange = (newSelections: MultiValue<SelectValue>, contractId: number) => {
    dispatch(
      addBonusesToContract({
        bonusesIds: newSelections.map((selection) => selection.value),
        contractId,
      })
    );
  };

  const options = allBonuses.data?.map((bonus) => ({
    value: bonus.id,
    label: bonus.name + ': ' + bonus.bonusAmount,
  }));

  const guradDataSorted =
    guards.data &&
    guards.data.slice().sort((guard1, guard2) => {
      if (guard1.fullName < guard2.fullName) {
        return -1;
      }
      if (guard1.fullName > guard2.fullName) {
        return 1;
      }
      return 0;
    });

  const tableContent = guradDataSorted?.map((guard) => {
    const { fullName, email, id, baseSalary, bonuses, payments, iban, cardNumber } = guard;
    const defaultOptions = bonuses.map((bonus) => ({
      value: bonus.id,
      label: bonus.name + ': ' + bonus.bonusAmount,
    }));

    return (
      <tr
        key={id}
        className={classNames(styles.tableDataRow, { [styles.noCursor]: payments.length === 0 })}
        onClick={() => {
          if (payments.length !== 0) {
            setPaymentsById(payments);
            setOpenPaymentsById(true);
          }
        }}
      >
        <td>
          <div className={styles.memberBlock}>
            <InputField
              changeAction={changePaymentsAction}
              defaultValue={fullName}
              object={guard}
              field={'fullName'}
              notChangble
            />
          </div>
        </td>
        <td>
          <InputField
            changeAction={changePaymentsAction}
            defaultValue={email}
            object={guard}
            field={'email'}
            notChangble
          />
        </td>
        <td>
          <InputField
            changeAction={changePaymentsAction}
            defaultValue={baseSalary}
            object={guard}
            field={'baseSalary'}
            notChangble
          />
        </td>
        <td>
          <InputField
            changeAction={changePaymentsAction}
            defaultValue={iban}
            object={guard}
            field={'iban'}
            notChangble
          />
        </td>
        <td>
          <InputField
            changeAction={changePaymentsAction}
            defaultValue={cardNumber}
            object={guard}
            field={'cardNumber'}
            notChangble
          />
        </td>
        <td>
          <div onClick={(e) => e.stopPropagation()}>
            <div className={styles.bonusesContainer}>
              <div className={styles.select}>
                <Select
                  isMulti
                  name="colors"
                  options={options}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={(newSelections) => handleChange(newSelections, id)}
                  defaultValue={defaultOptions}
                ></Select>
              </div>
              {bonuses.length > 0 && (
                <CustomPopup
                  trigger={
                    <div>
                      <InfoIcon />
                    </div>
                  }
                >
                  <div className={styles.bonusesBlock}>
                    {bonuses.map(({ id, name, bonusAmount, description }) => (
                      <div key={id}>
                        <CustomPopup trigger={<span className={styles.bonus}>{name + ': ' + bonusAmount}</span>}>
                          <div>{description}</div>
                        </CustomPopup>
                      </div>
                    ))}
                  </div>
                </CustomPopup>
              )}
            </div>
          </div>
        </td>
        <td>
          <button
            type="submit"
            className={classNames(styles.button, styles.buttonMedium)}
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
              setPaymentInfo(guard);
            }}
          >
            Make payment
          </button>
        </td>
      </tr>
    );
  });

  const [initialValues, setInitialValues] = useState<PaymentForm>({
    contracId: 0,
    totalBonus: 0,
    totalSalary: 0,
    startDate: format(parseISO(sub(new Date(), { months: 1 }).toISOString()), 'yyyy-MM-dd'),
    endDate: format(parseISO(new Date().toISOString()), 'yyyy-MM-dd'),
  });

  useEffect(() => {
    if (paymentInfo) {
      const totalBonus = paymentInfo.bonuses
        ? paymentInfo.bonuses.map(({ bonusAmount }) => bonusAmount).reduce((prev, current) => prev + current, 0)
        : 0;
      setInitialValues((prevState) => ({
        ...prevState,
        contracId: paymentInfo?.id,
        totalBonus,
        totalSalary: totalBonus + paymentInfo.baseSalary,
      }));
    }
  }, [paymentInfo]);

  const handleFormSubmit = useCallback((values) => {
    dispatch(makePayment(values));
    setOpen(false);
  }, []);

  const tableHeadersPaymentsById = [
    { title: 'Total Salary' },
    { title: 'Total Bonus' },
    { title: 'Start date' },
    { title: 'End date' },
    { title: 'Transaction date' },
  ];

  return (
    <div>
      <Table
        isDataLoading={false}
        tableHeaders={tableHeaders}
        customStyles={{ tableHeaderRow: styles.tableHeaderRow, tableDataRow: styles.tableDataRow }}
      >
        {tableContent}
      </Table>

      <CustomModal isOpen={openPaymentsById} onClose={() => setOpenPaymentsById(false)} title="Payments" crossIcon>
        <div>
          {paymentsById ? (
            <Table
              isDataLoading={false}
              tableHeaders={tableHeadersPaymentsById}
              customStyles={{ tableHeaderRow: styles.tableHeaderRow, tableDataRow: styles.tableDataRow }}
            >
              {paymentsById.map((paymentById, i) => {
                const { totalSalary, totalBonus, startDate, endDate, transactionDate } = paymentById;
                return (
                  <tr key={i} className={styles.tableDataRow}>
                    <td>{totalSalary}</td>
                    <td>{totalBonus}</td>
                    <td>{startDate}</td>
                    <td>{endDate}</td>
                    <td>{transactionDate}</td>
                  </tr>
                );
              })}
            </Table>
          ) : (
            <div>no payments</div>
          )}
        </div>
      </CustomModal>
      <CustomModal isOpen={open} onClose={() => setOpen(false)} title="Submitting payment" crossIcon>
        <Formik enableReinitialize={true} initialValues={initialValues} onSubmit={handleFormSubmit}>
          {() => (
            <Form>
              <div className={styles.fieldsBlocks}>
                <div className={styles.fieldBlock}>
                  <label htmlFor="totalBonus" className={styles.label}>
                    Total Bonus
                  </label>
                  <div className={styles.inputBlock}>
                    <Field min={0} name="totalBonus" type="number" className={styles.inputField} />
                  </div>
                  <ErrorMessage component="div" name="totalBonus" className={styles.errorField} />
                </div>
                <div className={styles.fieldBlock}>
                  <label htmlFor="totalSalary" className={styles.label}>
                    Total Salary
                  </label>
                  <div className={styles.inputBlock}>
                    <Field min={0} name="totalSalary" type="number" className={styles.inputField} />
                  </div>
                  <ErrorMessage component="div" name="totalSalary" className={styles.errorField} />
                </div>

                <div className={styles.fieldBlock}>
                  <label htmlFor="startDate" className={styles.label}>
                    Start Date
                  </label>
                  <div className={styles.inputBlock}>
                    <Field name="startDate" type="date" className={styles.inputField} />
                  </div>
                  <ErrorMessage component="div" name="startDate" className={styles.errorField} />
                </div>
                <div className={styles.fieldBlock}>
                  <label htmlFor="endDate" className={styles.label}>
                    End Date
                  </label>
                  <div className={styles.inputBlock}>
                    <Field name="endDate" type="date" className={styles.inputField} />
                  </div>
                  <ErrorMessage component="div" name="endDate" className={styles.errorField} />
                </div>
                <div className={styles.buttonsBlock}>
                  <button className={classNames(styles.button, styles.buttonClose)} onClick={() => setOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" className={styles.button}>
                    Submit
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </CustomModal>
    </div>
  );
};

export default Payments;
