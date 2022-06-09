import { makeStyles } from '@mui/styles';
import { BREAKPOINTS } from '@styles/breakpoints';

export const useStyles = makeStyles({
  navText: {
    marginLeft: 16,
    fontSize: 14,
    lineHeight: '20px',
    fontWeight: 'bold',

    [BREAKPOINTS.TABLET]: {
      display: 'none',
    },
  },
});
