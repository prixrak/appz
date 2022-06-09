import { makeStyles } from '@mui/styles';
import { COLORS } from '@styles/colors';

export const useStyles = makeStyles({
  '@keyframes slideShow': {
    from: { bottom: -100 },
    to: { bottom: 0 },
  },
  root: {
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 300,
    height: 55,
    backgroundColor: COLORS.BLUE.LIGHT,
    display: 'flex',
    alignItems: 'center',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    color: COLORS.WHITE,
    justifyContent: 'space-around',
    animation: '$slideShow 0.4s ease-out',
  },
  startLabel: {
    fontSize: 14,
    fontWeight: 400,
  },
  startButton: {
    border: `1px solid ${COLORS.WHITE}`,
    backgroundColor: COLORS.BLUE.LIGHT,
    color: COLORS.WHITE,
    height: 30,
    fontSize: 14,
    fontWeight: 500,
    borderRadius: 10,
    cursor: 'pointer',
  },
});
