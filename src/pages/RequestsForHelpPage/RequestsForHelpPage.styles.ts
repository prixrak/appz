import { makeStyles } from '@mui/styles';
import { COLORS } from '@styles/colors';

export const useStyles = makeStyles({
  root: {
    width: '100%',
    paddingBottom: 14,
    margin: '24px 0px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: 16,
    backgroundColor: COLORS.WHITE,
  },
  header: {
    padding: '16px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  title: {
    fontWeight: 700,
    fontSize: 16,
  },
  selectsWrapper: {
    width: 'fit-content',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    zIndex: 2,
  },
  tableHeaderRow: {
    background: COLORS.GRAY.PRIMARY,
    boxShadow: 'inset 0px -1px 0px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: -1,
    height: 69,
    fontWeight: 700,
    fontSize: 14,
    '& td': {
      paddingLeft: 24,
      borderTop: `1px solid ${COLORS.GRAY2}`,
      borderBottom: `1px solid ${COLORS.GRAY2}`,
    },
    '& td:nth-child(1)': {
      width: '20%',
    },
    '& td:nth-child(2)': {
      width: '20%',
    },
    '& td:nth-child(3)': {
      width: '20%',
    },
    '& td:nth-child(4)': {
      width: '20%',
    },
    '& td:nth-child(5)': {
      width: '20%',
    },
  },
  tableDataRow: {
    transition: 'background-color 0.1s',
    height: 70,
    backgroundColor: COLORS.WHITE,

    '& td': {
      paddingLeft: 24,
      borderBottom: `1px solid ${COLORS.GRAY2}`,
    },
    '&:last-child': {
      '& td': {
        borderBottom: 'none',
      },
    },

    '&:hover': {
      backgroundColor: COLORS.BLUE4,
      cursor: 'pointer',
    },
  },
  chartBtn: {
    padding: '8px 16px',
    borderRadius: 8,
    backgroundColor: COLORS.BLUE1,
    cursor: 'pointer',
    textDecoration: 'none',
    color: COLORS.GRAY6,
  },
  options: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 5,
    marginBottom: 5,
  },
  noData: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '& svg': {
      width: '45%',
      height: '45%',
    },
  },
});
