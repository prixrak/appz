import { makeStyles } from '@mui/styles';
import { COLORS } from '@styles/colors';

export const useStyles = makeStyles({
  root: {
    padding: '13px 24px',
    boxShadow: '0px 3px 5px -1px rgb(0 0 0 / 60%)',
    borderRadius: 4,
    backgroundColor: COLORS.GRAY6,
    color: COLORS.WHITE,
    opacity: 1,
    overflow: 'hidden',
  },
  intro: {
    animation: '$slideUp 0.1s linear',
  },
  outro: {
    animation: '$fadeAway 0.25s linear',
  },
  '@keyframes fadeAway': {
    '0%': {
      opacity: 1,
      transform: 'translateY(0)',
    },

    '100%': {
      opacity: 0,
      transform: 'translateY(24px)',
    },
  },
  '@keyframes slideUp': {
    '0%': {
      opacity: 0,
      maxHeight: 0,
      transform: 'translateY(48px)',
    },

    '100%': {
      opacity: 1,
      maxHeight: 100,
      transform: 'translateY(0)',
    },
  },
});
