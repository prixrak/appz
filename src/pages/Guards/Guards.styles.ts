import { makeStyles } from '@mui/styles';
import { COLORS } from '@styles/colors';

export const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  tableContainer: {
    width: '100%',
    overflow: 'hidden',
    overflowX: 'auto',
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
    '& td:nth-child(1)': {
      paddingLeft: 84,
      minWidth: 250,
    },
  },
  tableDataRow: {
    transition: 'background-color 0.1s',

    '&$hoverable:hover': {
      backgroundColor: COLORS.BLUE4,
      cursor: 'pointer',
    },
    height: 50,
  },

  memberBlock: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 24,
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
  addGuard: {
    marginTop: 20,
  },
  editAddress: {
    cursor: 'pointer',
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
  buttonsBlock: {
    display: 'flex',
    columnGap: 15,
    marginTop: 20,
    marginLeft: 40,
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
});
