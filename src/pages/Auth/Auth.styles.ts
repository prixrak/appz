import { makeStyles } from '@mui/styles';
import { COLORS } from '@styles/colors';

export const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BLUE1,
    minHeight: '100vh',
  },
  container: {
    position: 'relative',
    background: COLORS.WHITE1,
    height: 500,
    width: 400,
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 0 2em #e6e9f9',
  },
  fieldsBlocks: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 20,
  },
  fieldBlock: {
    display: 'flex',
    flexDirection: 'column',
    background: COLORS.WHITE,
    borderRadius: 20,
    padding: '10px 20px',
    '& svg': {
      width: 16,
      height: 16,
      fill: COLORS.GRAY6,
    },
  },
  inputBlock: {
    marginTop: 5,
    display: 'flex',
    alignItems: 'center',
    columnGap: 4,
  },
  label: {
    fontSize: 18,
    fontWeight: 500,
    color: '#4d4d4d',
  },
  inputField: {
    borderWidth: 0,
    cursor: 'pointer',
    height: 30,
    '&:focus': {
      outline: 'none',
      borderBottom: '1px solid #3e4684',
    },
    '&:hover': {
      borderBottom: '1px solid #3e4684',
    },
  },
  errorField: {
    marginTop: 3,
    fontSize: 14,
    color: COLORS.RED1,
  },
  button: {
    background: '#3e4684',
    color: COLORS.WHITE,
    borderRadius: 30,
    fontWeight: 600,
    border: 0,
    height: 50,
    cursor: 'pointer',
    transition: 'all 0.2s ease-in',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },
  footerLink: {
    position: 'absolute',
    fontSize: 12,
    textDecoration: 0,
    display: 'block',
    left: 70,
    bottom: 70,
    cursor: 'pointer',
  },
});
