import { makeStyles } from '@mui/styles';
import { COLORS } from '@styles/colors';

export const useStyles = makeStyles({
  resolvedPersonePopup: {
    '&-content': {
      width: 'auto !important',
      boxShadow: '0 4px 12px rgb(180 180 180 / 60%) !important',
      color: COLORS.WHITE,
      fontWeight: 400,
      fontSize: 14,
      padding: '5px 10px',
      background: COLORS.GRAY6,
      borderRadius: 4,
    },
    '&-arrow': {
      color: COLORS.GRAY6,
    },
  },
});
