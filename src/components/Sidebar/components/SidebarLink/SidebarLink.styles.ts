import { makeStyles } from '@mui/styles';
import { BREAKPOINTS } from '@styles/breakpoints';
import { COLORS } from '@styles/colors';

export const useStyles = makeStyles({
  navItem: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    textDecoration: 'none',
    height: 64,
    paddingLeft: 16,
    borderRadius: 16,
    marginTop: 19,
    color: COLORS.GRAY6,

    '& svg': {
      stroke: COLORS.GRAY6,
    },

    [BREAKPOINTS.TABLET]: {
      justifyContent: 'center',
      paddingLeft: 0,
    },
  },
  activeNavItem: {
    backgroundColor: COLORS.GREEN2,
    color: COLORS.WHITE,
    '& svg': {
      stroke: COLORS.WHITE,
    },
  },
});
