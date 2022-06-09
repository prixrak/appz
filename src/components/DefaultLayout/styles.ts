import { makeStyles } from '@mui/styles';
import { BREAKPOINTS } from '../../styles/breakpoints';
import { COLORS } from '../../styles/colors';

export const useStyles = makeStyles({
  root: {
    position: 'relative',
    display: 'flex',
    backgroundColor: COLORS.WHITE1,
    minHeight: '100vh',
  },
  activeNavButton: {
    width: 64,
    height: 64,
  },
  body: {
    position: 'relative',
    flex: 1,
    padding: '0 40px',

    [BREAKPOINTS.MOBILE]: {
      padding: '50px 20px 20px',
    },
  },
  notificationsHolder: {
    position: 'fixed',
    bottom: 0,
    zIndex: 2,
    left: '50%',
    transform: 'translateX(-50%)',
  },
});
