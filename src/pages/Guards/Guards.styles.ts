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
});
