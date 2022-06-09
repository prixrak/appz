import { makeStyles } from '@mui/styles';
import { COLORS } from '@styles/colors';

export const useStyles = makeStyles({
  root: {
    position: 'fixed',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    zIndex: 2,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.6)',
    animation: '$fadeIn 0.1s ease-in',
    zIndex: -1,
  },
  '@keyframes fadeIn': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  modal: {
    minWidth: 400,
    minHeight: 200,
    backgroundColor: COLORS.WHITE,
    borderRadius: 16,
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.15)',
    animation: '$slideUp 0.2s ease-out',
  },
  '@keyframes slideUp': {
    from: { transform: 'translateY(25%)' },
    to: { transform: 'translateY(0)' },
  },
  header: {
    padding: '30px 50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: `1px solid ${COLORS.GRAY6}`,
  },
  title: {
    fontSize: 22,
    fontWeight: 900,
    margin: 0,
  },
  crossIcon: {
    width: 13,
    height: 'auto',
    fill: COLORS.GRAY6,
    marginTop: 4,
    cursor: 'pointer',
  },
  modalBody: {
    padding: '36px 50px',
  },
});
