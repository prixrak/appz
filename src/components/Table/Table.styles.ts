import { makeStyles } from '@mui/styles';
import { BREAKPOINTS } from '@styles/breakpoints';
import { COLORS } from '@styles/colors';

export const useStyles = makeStyles({
  root: {
    height: '100%',
  },
  table: {
    height: '100%',
    width: '100%',
  },
  tableHeaderRow: {
    background: COLORS.BLUE4,
    position: 'sticky',
    zIndex: 1,
    top: 0,
    height: 69,
    fontWeight: 700,
    fontSize: 14,

    [BREAKPOINTS.MOBILE]: {
      display: 'none',
    },
  },
  tableDataRow: {
    height: 76,
    [BREAKPOINTS.MOBILE]: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, auto)',
      gridTemplateRows: 'repeat(2, auto))',
      marginBottom: 4,
      paddingBottom: 12,
    },
  },
  textSkeleton: {
    width: '80%',
    height: '50%',
    marginLeft: '5%',
  },
  sortHolder: {
    display: 'none',

    [BREAKPOINTS.MOBILE]: {
      width: '100%',
      display: 'flex',
      paddingLeft: 16,
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
  },
  loaderHolder: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backToTopButton: {
    background: COLORS.GREEN2,
    borderRadius: '100%',
    width: 50,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    bottom: 25,
    right: 25,
    cursor: 'pointer',

    '& svg': {
      fill: COLORS.WHITE,
    },
  },
});
