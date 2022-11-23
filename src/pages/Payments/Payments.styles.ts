import { makeStyles } from '@mui/styles';
import { COLORS } from '@styles/colors';

export const useStyles = makeStyles({
  root: {
    height: '100%',
  },
  individualReportTable: {
    height: '100%',
    width: '100%',
  },
  tableHeaderRow: {
    background: COLORS.WHITE1,
    position: 'sticky',
    top: 0,
    height: 69,
    fontWeight: 700,
    fontSize: 14,
    '& td': {
      borderBottom: `1px solid ${COLORS.GRAY6}`,
    },
    '& td:first-child': {
      width: '15%',
    },
    '& td:nth-child(2)': {
      width: '20%',
    },
    '& td:nth-child(3)': {
      width: '10%',
    },
    '& td:nth-child(4)': {
      width: '5%',
    },
    '& td:nth-child(5)': {
      width: '15%',
    },
  },
  select: {
    minWidth: 200,
  },
  tableDataRow: {
    transition: 'background-color 0.1s',

    cursor: 'pointer',
    '&:hover': {
      backgroundColor: COLORS.BLUE1,
    },
    height: 75,
  },
  memberBlock: {
    display: 'flex',
    alignItems: 'center',
    columnGap: 30,
  },
  checkBoxContainer: {
    height: 20,
    width: 20,
  },
  plus: {
    marginLeft: 22,
    marginTop: 20,
    cursor: 'pointer',
    width: 24,
  },
  button: {
    cursor: 'pointer',
    alignItems: 'center',
    fontWeight: 900,
    borderRadius: 8,
    justifyContent: 'center',
    textDecoration: 'none',
    height: 46,
    padding: '14px 24px',
    width: 150,
    color: COLORS.WHITE,
    background: COLORS.BLUE.LIGHT,
    border: 'none',
  },
  buttonClose: {
    border: `1px solid ${COLORS.BLUE.LIGHT}`,
    color: COLORS.BLUE.LIGHT,
    background: COLORS.WHITE,
  },
  buttonMedium: {
    width: 140,
    height: 42,
    fontSize: 16,
    fontWeight: 400,
    padding: 0,
  },
  buttonsBlock: {
    display: 'flex',
    columnGap: 15,
    marginTop: 20,
    marginLeft: 40,
  },
  fieldsBlocks: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 20,
  },
  fieldBlock: {
    display: 'flex',
    flexDirection: 'column',
    background: COLORS.WHITE,
    borderRadius: 20,
    padding: '1px 20px',
    '& svg': {
      width: 16,
      height: 16,
      fill: COLORS.GRAY6,
    },
  },
  inputBlock: {
    display: 'flex',
    alignItems: 'center',
    columnGap: 4,
  },
  label: {
    fontSize: 18,
    fontWeight: 500,
    color: '#4d4d4d',
  },
  inputField: {
    cursor: 'pointer',
    height: 30,
    border: `1px solid ${COLORS.BLUE.LIGHT}`,
    borderRadius: 8,
    display: 'block',
    width: '70%',

    '&:focus': {
      outline: 'none',
      borderBottom: '1px solid #3e4684',
    },
    '&:hover': {
      borderBottom: '1px solid #3e4684',
    },
  },
  errorField: {
    marginTop: 3,
    fontSize: 14,
    color: COLORS.RED1,
  },
  bonusesContainer: {
    display: 'flex',
    columnGap: 10,
    alignItems: 'center',
    marginRight: 40,
  },
  noCursor: {
    cursor: 'default',

    '&:hover': {
      backgroundColor: 'inherit',
    },
  },
  plusBonus: {},
  bonusesBlock: {
    display: 'flex',
    flexWrap: 'wrap',
    columnGap: 10,
    maxWidth: 200,
    height: '100%',
    rowGap: 2,
    alignItems: 'center',
  },
  bonus: {
    background: COLORS.GREEN2,
    color: COLORS.WHITE,
    padding: 3,
    fontSize: 12,
    borderRadius: 4,
  },
});
