import { COLORS } from '@styles/colors';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
  },

  checkMarker: {
    position: 'absolute',
    opacity: 0,
    cursor: 'pointer',
    height: '100%',
    zIndex: 1,
  },

  checkmark: {
    height: 20,
    width: 20,
    position: 'relative',
    borderRadius: 4,
    margin: '1px 7px 0 0',
    border: `1px solid ${COLORS.GRAY6}`,
    backgroundColor: COLORS.WHITE,

    '$checkMarker:checked ~ &': {
      backgroundColor: COLORS.BLUE.LIGHT,
      border: `1px solid ${COLORS.BLUE.LIGHT}`,
    },

    '$checkboxContainer:hover $checkMarker:not(:checked) ~ &': {
      backgroundColor: COLORS.BLUE4,
    },

    '&::after': {
      content: '""',
      position: 'absolute',
      display: 'none',
      left: 7,
      top: 4,
      width: 3,
      height: 7,
      border: `solid ${COLORS.WHITE}`,
      borderWidth: '0 2px 2px 0',
      transform: 'rotate(45deg)',

      '$checkMarker:checked ~ &': {
        display: 'block',
      },
    },
  },

  checkboxContainer: {
    display: 'flex',
    cursor: 'pointer',
    userSelect: 'none',
    position: 'relative',
  },

  checkboxLabel: {
    marginLeft: 8,
    cursor: 'pointer',
  },
});
