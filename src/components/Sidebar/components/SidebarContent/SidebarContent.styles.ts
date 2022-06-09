import { makeStyles } from '@mui/styles';
import { COLORS } from '@styles/colors';
import { BREAKPOINTS } from '../../../../styles/breakpoints';

export const useStyles = makeStyles({
  navContianer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0 10px',
    position: 'relative',

    [BREAKPOINTS.TABLET]: {
      padding: '0 5px',
    },
  },
  logOutButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    color: COLORS.WHITE,
    cursor: 'pointer',
    fontWeight: 700,
  },
});
