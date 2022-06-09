import { makeStyles } from '@mui/styles';
import { BREAKPOINTS } from '../../styles/breakpoints';
import { COLORS } from '../../styles/colors';

export const useStyles = makeStyles({
  root: {
    minWidth: 220,
    minHeight: '100vh',
    maxHeight: '100vh',
    backgroundColor: COLORS.WHITE,
    borderRightColor: COLORS.GRAY6,
    borderRightWidth: '1px',
    borderRightStyle: 'solid',
    zIndex: 2,

    [BREAKPOINTS.TABLET]: {
      maxWidth: 80,
      minWidth: 80,
    },
  },
  container: {
    display: 'flex',
    height: '100vh',
    flexDirection: 'column',
    position: 'fixed',
    width: 220,
    background: COLORS.GREEN1,

    [BREAKPOINTS.TABLET]: {
      width: 80,
    },
  },
  tabletOverley: {
    position: 'absolute',
    content: '""',
    display: 'block',
    height: '100%',
    width: '100%',
    background: 'rgba(0,0,0,0.5)',
    zIndex: 10,

    [BREAKPOINTS.DESKTOP]: {
      display: 'none',
    },
  },
  '@keyframes slideUp': {
    from: { left: '-100%' },
    to: { left: 0 },
  },
  tabletContainer: {
    animation: '$slideUp 0.3s ease-out',
    display: 'flex',
    height: '100vh',
    flexDirection: 'column',
    position: 'fixed',
    width: 220,
    background: COLORS.WHITE,
  },
});
