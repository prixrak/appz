import { makeStyles } from '@mui/styles';
import { COLORS } from '@styles/colors';

export const useStyles = makeStyles({
  modalBody: {
    height: 400,
    width: 500,
  },
  options: {
    marginTop: -10,
    display: 'flex',
    columnGap: 2,
    justifyContent: 'flex-end',
  },
  option: {
    padding: '3px 10px',
    borderRadius: 4,
    backgroundColor: COLORS.GRAY.LIGHT,
    color: COLORS.GRAY.PRIMARY,
    fontSize: 18,
    cursor: 'pointer',
  },
  activeOption: {
    backgroundColor: COLORS.GREEN1,
  },
});
