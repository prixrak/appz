import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    userSelect: 'none',
    paddingRight: 8,
  },
  sortableTitle: {
    cursor: 'pointer',
  },
  sortHolder: {
    display: 'flex',
    cursor: 'pointer',
    flexDirection: 'column',
    marginRight: 8,
    '& svg': {
      margin: -1,
      height: 12,
      width: 'auto',

      '& path': {
        strokeWidth: 4,
      },
    },
  },
});
